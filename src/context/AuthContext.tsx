import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { EmailOtpType, User } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { isValidEmail, isValidOtp, isValidPassword, type AuthResult } from '@/lib/auth'
import { getAuthRedirectUrl } from '@/lib/auth-redirect'
import { getAuthErrorMessage } from '@/lib/auth-errors'
import { getDashboardPath, type UserRole } from '@/lib/roles'
import { isValidPhone, normalizePhoneToE164 } from '@/lib/phone'
import { assignUserRole, getUserProfile, type UserProfile } from '@/services/userService'

export type { UserProfile as User }

interface AuthContextType {
  user: UserProfile | null
  authUser: User | null
  isAuthenticated: boolean
  needsRoleSelection: boolean
  loading: boolean
  emailVerified: boolean
  needsEmailVerification: boolean
  login: (email: string, password: string) => Promise<AuthResult>
  signup: (name: string, email: string, password: string) => Promise<AuthResult>
  sendPhoneOtp: (phone: string, name?: string) => Promise<AuthResult>
  verifyPhoneOtp: (phone: string, token: string) => Promise<AuthResult>
  loginWithGoogle: () => Promise<AuthResult>
  completeRoleSelection: (role: UserRole) => Promise<AuthResult>
  resetPassword: (email: string) => Promise<AuthResult>
  sendVerificationEmail: (email?: string) => Promise<AuthResult>
  handleAuthCallback: () => Promise<AuthResult>
  reloadAuthUser: () => Promise<void>
  logout: () => Promise<void>
  getUserDashboardPath: () => string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function usesEmailProvider(authUser: User | null): boolean {
  if (!authUser) return false
  return (
    authUser.app_metadata?.provider === 'email' ||
    authUser.identities?.some((identity) => identity.provider === 'email') === true
  )
}

function usesPhoneProvider(authUser: User | null): boolean {
  if (!authUser) return false
  return (
    authUser.app_metadata?.provider === 'phone' ||
    authUser.identities?.some((identity) => identity.provider === 'phone') === true
  )
}

function checkNeedsEmailVerification(authUser: User | null): boolean {
  if (!authUser) return false
  if (usesPhoneProvider(authUser) && authUser.phone_confirmed_at) return false
  if (!usesEmailProvider(authUser) && authUser.phone_confirmed_at) return false
  if (!authUser.email) return false
  return !authUser.email_confirmed_at
}

async function loadProfileForUser(authUser: User): Promise<UserProfile | null> {
  try {
    return await getUserProfile(authUser.id)
  } catch (error) {
    console.warn('Failed to load user profile.', error)
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      console.warn('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env')
      setLoading(false)
      return
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const nextAuthUser = session?.user ?? null
      setAuthUser(nextAuthUser)

      if (nextAuthUser) {
        const profile = await loadProfileForUser(nextAuthUser)
        setUser(profile)
      } else {
        setUser(null)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const getUserDashboardPath = useCallback(() => {
    return user ? getDashboardPath(user.role) : '/select-role'
  }, [user])

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    if (!isSupabaseConfigured) {
      return { success: false, error: 'Supabase is not configured.' }
    }
    const trimmedEmail = email.trim()
    if (!isValidEmail(trimmedEmail)) {
      return { success: false, error: 'Please enter a valid email address.' }
    }
    if (!isValidPassword(password)) {
      return { success: false, error: 'Password must be at least 8 characters.' }
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      })
      if (error) throw error
      if (!data.user) {
        return { success: false, error: 'Sign in failed. Please try again.' }
      }

      const profile = await loadProfileForUser(data.user)
      setAuthUser(data.user)
      setUser(profile)

      const needsVerification = checkNeedsEmailVerification(data.user)
      const needsRoleSelection = !profile

      return {
        success: true,
        role: profile?.role,
        needsEmailVerification: needsVerification,
        needsRoleSelection,
      }
    } catch (error) {
      return { success: false, error: getAuthErrorMessage(error) }
    }
  }, [])

  const signup = useCallback(
    async (name: string, email: string, password: string): Promise<AuthResult> => {
      if (!isSupabaseConfigured) {
        return { success: false, error: 'Supabase is not configured.' }
      }
      const trimmedName = name.trim()
      const trimmedEmail = email.trim()
      if (!trimmedName || trimmedName.length < 2) {
        return { success: false, error: 'Full name is required.' }
      }
      if (!isValidEmail(trimmedEmail)) {
        return { success: false, error: 'Please enter a valid email address.' }
      }
      if (!isValidPassword(password)) {
        return { success: false, error: 'Password must be at least 8 characters.' }
      }
      try {
        const redirectTo = getAuthRedirectUrl('/auth/callback')
        const { data, error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: {
            data: { name: trimmedName },
            emailRedirectTo: redirectTo,
          },
        })
        if (error) throw error
        if (!data.user) {
          return { success: false, error: 'Sign up failed. Please try again.' }
        }

        // Supabase may return a user with no session when email confirmation is required.
        if (data.session) {
          setAuthUser(data.user)
          setUser(null)
          const needsVerification = checkNeedsEmailVerification(data.user)
          if (needsVerification) {
            return { success: true, needsEmailVerification: true }
          }
          return { success: true, needsRoleSelection: true }
        }

        return { success: true, needsEmailVerification: true }
      } catch (error) {
        return { success: false, error: getAuthErrorMessage(error) }
      }
    },
    []
  )

  const sendPhoneOtp = useCallback(async (phone: string, name?: string): Promise<AuthResult> => {
    if (!isSupabaseConfigured) {
      return { success: false, error: 'Supabase is not configured.' }
    }
    if (!isValidPhone(phone)) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number.' }
    }
    const normalizedPhone = normalizePhoneToE164(phone)
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: normalizedPhone,
        options: name?.trim()
          ? { data: { name: name.trim() } }
          : undefined,
      })
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: getAuthErrorMessage(error) }
    }
  }, [])

  const verifyPhoneOtp = useCallback(async (phone: string, token: string): Promise<AuthResult> => {
    if (!isSupabaseConfigured) {
      return { success: false, error: 'Supabase is not configured.' }
    }
    if (!isValidPhone(phone)) {
      return { success: false, error: 'Invalid phone number.' }
    }
    if (!isValidOtp(token)) {
      return { success: false, error: 'Please enter the 6-digit OTP.' }
    }
    const normalizedPhone = normalizePhoneToE164(phone)
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: normalizedPhone,
        token: token.trim(),
        type: 'sms',
      })
      if (error) throw error
      if (!data.user) {
        return { success: false, error: 'Verification failed. Please try again.' }
      }

      const profile = await loadProfileForUser(data.user)
      setAuthUser(data.user)
      setUser(profile)

      return {
        success: true,
        role: profile?.role,
        needsRoleSelection: !profile,
      }
    } catch (error) {
      return { success: false, error: getAuthErrorMessage(error) }
    }
  }, [])

  const loginWithGoogle = useCallback(async (): Promise<AuthResult> => {
    if (!isSupabaseConfigured) {
      return { success: false, error: 'Supabase is not configured.' }
    }
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: getAuthRedirectUrl('/auth/callback'),
        },
      })
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: getAuthErrorMessage(error) }
    }
  }, [])

  const completeRoleSelection = useCallback(
    async (role: UserRole): Promise<AuthResult> => {
      if (!authUser) {
        return { success: false, error: 'You must be signed in.' }
      }
      try {
        const profile = await assignUserRole(authUser, role)
        setUser(profile)
        return { success: true, role: profile.role }
      } catch (error) {
        return { success: false, error: getAuthErrorMessage(error) }
      }
    },
    [authUser]
  )

  const resetPassword = useCallback(async (email: string): Promise<AuthResult> => {
    if (!isSupabaseConfigured) {
      return { success: false, error: 'Supabase is not configured.' }
    }
    const trimmedEmail = email.trim()
    if (!isValidEmail(trimmedEmail)) {
      return { success: false, error: 'Please enter a valid email address.' }
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
        redirectTo: getAuthRedirectUrl('/auth/callback'),
      })
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: getAuthErrorMessage(error) }
    }
  }, [])

  const sendVerificationEmail = useCallback(async (email?: string): Promise<AuthResult> => {
    const targetEmail = email ?? authUser?.email
    if (!targetEmail) {
      return { success: false, error: 'You must be signed in or provide an email.' }
    }
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: targetEmail,
        options: {
          emailRedirectTo: getAuthRedirectUrl('/auth/callback'),
        },
      })
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: getAuthErrorMessage(error) }
    }
  }, [authUser])

  const handleAuthCallback = useCallback(async (): Promise<AuthResult> => {
    try {
      const params = new URLSearchParams(window.location.search)
      const tokenHash = params.get('token_hash')
      const type = params.get('type') as EmailOtpType | null

      if (tokenHash && type) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type,
        })
        if (error) throw error
      }

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()
      if (sessionError) throw sessionError

      const nextAuthUser = session?.user ?? null
      setAuthUser(nextAuthUser)

      if (!nextAuthUser) {
        return { success: false, error: 'Could not complete sign in. Try signing in again.' }
      }

      const profile = await loadProfileForUser(nextAuthUser)
      setUser(profile)

      const needsVerification = checkNeedsEmailVerification(nextAuthUser)
      const needsRoleSelection = !profile && !needsVerification

      return {
        success: true,
        role: profile?.role,
        needsEmailVerification: needsVerification,
        needsRoleSelection,
      }
    } catch (error) {
      return { success: false, error: getAuthErrorMessage(error) }
    }
  }, [])

  const reloadAuthUser = useCallback(async () => {
    const {
      data: { user: nextAuthUser },
    } = await supabase.auth.getUser()
    setAuthUser(nextAuthUser)
    if (nextAuthUser) {
      const profile = await loadProfileForUser(nextAuthUser)
      setUser(profile)
    } else {
      setUser(null)
    }
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    setAuthUser(null)
  }, [])

  const emailVerified = !!authUser?.email_confirmed_at
  const needsEmailVerification = checkNeedsEmailVerification(authUser)
  const needsRoleSelection = !!authUser && !user && !needsEmailVerification

  return (
    <AuthContext.Provider
      value={{
        user,
        authUser,
        isAuthenticated: !!authUser && !!user,
        needsRoleSelection,
        loading,
        emailVerified,
        needsEmailVerification,
        login,
        signup,
        sendPhoneOtp,
        verifyPhoneOtp,
        loginWithGoogle,
        completeRoleSelection,
        resetPassword,
        sendVerificationEmail,
        handleAuthCallback,
        reloadAuthUser,
        logout,
        getUserDashboardPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
