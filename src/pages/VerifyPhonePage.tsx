import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Loader2, Smartphone } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { PageTransition } from '@/components/animations/PageTransition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getDashboardPath } from '@/lib/roles'
import { formatPhoneDisplay, normalizePhoneToE164 } from '@/lib/phone'

interface VerifyPhoneLocationState {
  phone?: string
  name?: string
  mode?: 'login' | 'signup'
}

export default function VerifyPhonePage() {
  const { sendPhoneOtp, verifyPhoneOtp } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as VerifyPhoneLocationState) ?? {}
  const phone = state.phone ?? ''
  const displayPhone = phone ? formatPhoneDisplay(normalizePhoneToE164(phone)) : ''

  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  if (!phone) {
    return (
      <PageTransition className="w-full max-w-md px-4">
        <Card className="border-border/40">
          <CardContent className="space-y-4 py-8 text-center">
            <p className="text-white/60">No phone number provided.</p>
            <Link to="/login">
              <Button variant="highlight">Back to sign in</Button>
            </Link>
          </CardContent>
        </Card>
      </PageTransition>
    )
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    const result = await verifyPhoneOtp(phone, otp)
    setLoading(false)
    if (!result.success) {
      setError(result.error)
      return
    }
    if (result.needsRoleSelection) {
      navigate('/select-role', { replace: true })
      return
    }
    navigate(result.role ? getDashboardPath(result.role) : '/student/dashboard', { replace: true })
  }

  const handleResend = async () => {
    setError('')
    setMessage('')
    setResendLoading(true)
    const result = await sendPhoneOtp(phone, state.name)
    setResendLoading(false)
    if (result.success) {
      setMessage('OTP sent. Check your messages.')
    } else {
      setError(result.error)
    }
  }

  return (
    <PageTransition className="w-full max-w-md px-4">
      <Card className="border-border/40">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary/20">
            <Smartphone className="h-6 w-6 text-highlight" />
          </div>
          <CardTitle className="text-2xl">Verify your phone</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to{' '}
            <span className="text-white/70">{displayPhone}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
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
            <div className="space-y-2">
              <Label htmlFor="otp">One-time password</Label>
              <Input
                id="otp"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                required
                className="text-center text-lg tracking-[0.3em]"
              />
            </div>
            <Button type="submit" variant="highlight" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & continue'
              )}
            </Button>
          </form>
          <Button
            variant="outline"
            className="mt-3 w-full"
            onClick={handleResend}
            disabled={resendLoading}
          >
            {resendLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Resend OTP'
            )}
          </Button>
          <Link
            to={state.mode === 'signup' ? '/signup' : '/login'}
            className="mt-4 block text-center text-sm text-white/50 hover:text-white/70"
          >
            Change phone number
          </Link>
        </CardContent>
      </Card>
    </PageTransition>
  )
}
