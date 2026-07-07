import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { PageTransition } from '@/components/animations/PageTransition'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getDashboardPath } from '@/lib/roles'

export default function AuthCallbackPage() {
  const { handleAuthCallback } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function run() {
      const result = await handleAuthCallback()
      if (cancelled) return

      if (!result.success) {
        setError(result.error)
        return
      }

      if (result.needsEmailVerification) {
        navigate('/verify-email', { replace: true })
        return
      }
      if (result.needsRoleSelection) {
        navigate('/select-role', { replace: true })
        return
      }
      navigate(result.role ? getDashboardPath(result.role) : '/student/dashboard', { replace: true })
    }

    run()
    return () => {
      cancelled = true
    }
  }, [handleAuthCallback, navigate])

  return (
    <PageTransition className="w-full max-w-md px-4">
      <Card className="border-border/40">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Completing sign in</CardTitle>
          <CardDescription>Please wait while we verify your account.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 py-6">
          {!error ? (
            <Loader2 className="h-8 w-8 animate-spin text-highlight" />
          ) : (
            <div className="rounded-[14px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
        </CardContent>
      </Card>
    </PageTransition>
  )
}
