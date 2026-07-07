import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton'
import { AuthDivider } from '@/components/auth/AuthDivider'
import { AuthMethodTabs, type AuthMethod } from '@/components/auth/AuthMethodTabs'
import { PhoneInput } from '@/components/auth/PhoneInput'
import { PageTransition } from '@/components/animations/PageTransition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getDashboardPath } from '@/lib/roles'
import type { UserRole } from '@/lib/roles'

export default function LoginPage() {
  const [method, setMethod] = useState<AuthMethod>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, sendPhoneOtp } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string }; message?: string })?.from?.pathname
  const infoMessage = (location.state as { message?: string })?.message

  const redirectAfterAuth = (
    role?: UserRole,
    needsVerification?: boolean,
    needsRoleSelection?: boolean
  ) => {
    if (needsVerification) {
      navigate('/verify-email', { replace: true, state: { email: email.trim() } })
      return
    }
    if (needsRoleSelection) {
      navigate('/select-role', { replace: true })
      return
    }
    const path = role ? getDashboardPath(role) : from ?? '/student/dashboard'
    navigate(path, { replace: true })
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (!result.success) {
      setError(result.error)
      return
    }
    redirectAfterAuth(result.role, result.needsEmailVerification, result.needsRoleSelection)
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await sendPhoneOtp(phone)
    setLoading(false)
    if (!result.success) {
      setError(result.error)
      return
    }
    navigate('/verify-phone', {
      replace: true,
      state: { phone, mode: 'login' },
    })
  }

  return (
    <PageTransition className="w-full max-w-md px-4">
      <Card className="border-border/40">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to continue your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleSignInButton
            onSuccess={(role, needsRoleSelection) => redirectAfterAuth(role, false, needsRoleSelection)}
          />
          <AuthDivider />

          <AuthMethodTabs value={method} onChange={setMethod} />

          {infoMessage && (
            <div className="mb-4 rounded-[14px] border border-accent-secondary/30 bg-accent-primary/10 px-4 py-3 text-sm text-highlight">
              {infoMessage}
            </div>
          )}

          {method === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-5">
              {error && (
                <div className="rounded-[14px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end text-sm">
                <Link to="/forgot-password" className="text-highlight hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" variant="highlight" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePhoneSubmit} className="space-y-5">
              {error && (
                <div className="rounded-[14px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile number</Label>
                <PhoneInput id="phone" value={phone} onChange={setPhone} required />
                <p className="text-xs text-white/40">We&apos;ll send a 6-digit OTP via SMS.</p>
              </div>
              <Button type="submit" className="w-full" variant="highlight" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-white/50">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-highlight hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </PageTransition>
  )
}
