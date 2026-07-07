import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Loader2, MailCheck } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { PageTransition } from '@/components/animations/PageTransition'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getDashboardPath } from '@/lib/roles'
import { getAuthRedirectUrl } from '@/lib/auth-redirect'
import { supabase } from '@/lib/supabase'

export default function VerifyEmailPage() {
  const { authUser, user, sendVerificationEmail, reloadAuthUser, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [checkLoading, setCheckLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const dashboard = user ? getDashboardPath(user.role) : '/select-role'
  const displayEmail =
    authUser?.email ?? (location.state as { email?: string })?.email ?? ''
  const isLoggedIn = !!authUser
  const redirectUrl = getAuthRedirectUrl('/auth/callback')

  const handleResend = async () => {
    if (!displayEmail) {
      setError('No email address available. Please sign up again.')
      return
    }
    setError('')
    setMessage('')
    setLoading(true)
    const result = await sendVerificationEmail(displayEmail)
    setLoading(false)
    if (result.success) {
      setMessage('Verification email sent. Check your inbox and spam folder.')
    } else {
      setError(result.error)
    }
  }

  const handleCheckVerified = async () => {
    if (!isLoggedIn) {
      navigate('/login', {
        replace: true,
        state: { message: 'Sign in after verifying your email.' },
      })
      return
    }
    setError('')
    setCheckLoading(true)
    await reloadAuthUser()
    const {
      data: { user: freshUser },
    } = await supabase.auth.getUser()
    setCheckLoading(false)
    if (freshUser?.email_confirmed_at) {
      navigate(user ? dashboard : '/select-role', { replace: true })
      return
    }
    setError('Email not verified yet. Click the link in your email, then try again.')
  }

  return (
    <PageTransition className="w-full max-w-md px-4">
      <Card className="border-border/40">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary/20">
            <MailCheck className="h-6 w-6 text-highlight" />
          </div>
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription>
            {displayEmail ? (
              <>
                We sent a verification link to{' '}
                <span className="text-white/70">{displayEmail}</span>
              </>
            ) : (
              'Check your inbox for the verification link.'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isLoggedIn && (
            <p className="text-center text-sm text-white/50">
              After clicking the link in your email, sign in to access your dashboard.
            </p>
          )}

          <div className="rounded-[14px] border border-border/30 bg-bg-secondary/30 px-4 py-3 text-xs text-white/50">
            <p className="font-medium text-white/70">Not receiving emails?</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Check your spam or promotions folder</li>
              <li>Avoid temporary email addresses — they often block auth emails</li>
              <li>
                In Supabase: Authentication → URL Configuration, add{' '}
                <span className="text-white/70">{redirectUrl}</span>
              </li>
              <li>
                For production, configure SMTP under Authentication → Email in Supabase
              </li>
              <li>
                Or{' '}
                <Link to="/signup" className="text-highlight hover:underline">
                  sign up with phone OTP
                </Link>{' '}
                instead
              </li>
            </ul>
          </div>

          {message && (
            <div className="rounded-[14px] border border-accent-secondary/30 bg-accent-primary/10 px-4 py-3 text-sm text-highlight">
              {message}
            </div>
          )}
          {error && (
            <div className="rounded-[14px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          {isLoggedIn ? (
            <Button
              variant="highlight"
              className="w-full"
              onClick={handleCheckVerified}
              disabled={checkLoading}
            >
              {checkLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                "I've verified my email"
              )}
            </Button>
          ) : (
            <Button
              variant="highlight"
              className="w-full"
              onClick={() =>
                navigate('/login', {
                  replace: true,
                  state: { message: 'Sign in after verifying your email.' },
                })
              }
            >
              Go to sign in
            </Button>
          )}
          <Button variant="outline" className="w-full" onClick={handleResend} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Resend verification email'
            )}
          </Button>
          {isLoggedIn ? (
            <Button variant="ghost" className="w-full text-white/50" onClick={() => logout()}>
              Sign out
            </Button>
          ) : (
            <Link
              to="/login"
              className="block text-center text-sm text-white/50 hover:text-white/70"
            >
              Back to login
            </Link>
          )}
        </CardContent>
      </Card>
    </PageTransition>
  )
}
