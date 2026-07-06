import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Users } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { RoleSelector } from '@/components/auth/RoleSelector'
import { PageTransition } from '@/components/animations/PageTransition'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { UserRole } from '@/lib/roles'
import { getDashboardPath } from '@/lib/roles'

export default function SelectRolePage() {
  const [role, setRole] = useState<UserRole>('student')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { completeRoleSelection, authUser } = useAuth()
  const navigate = useNavigate()

  const handleContinue = async () => {
    setError('')
    setLoading(true)
    const result = await completeRoleSelection(role)
    setLoading(false)
    if (!result.success) {
      setError(result.error)
      return
    }
    navigate(getDashboardPath(role), { replace: true })
  }

  return (
    <PageTransition className="w-full max-w-md px-4">
      <Card className="border-border/40">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary/20">
            <Users className="h-6 w-6 text-highlight" />
          </div>
          <CardTitle className="text-2xl">How will you use Lumen?</CardTitle>
          <CardDescription>
            Welcome{authUser?.email ? `, ${authUser.email.split('@')[0]}` : ''}! Choose your role to
            get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {error && (
            <div className="rounded-[14px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          <RoleSelector value={role} onChange={setRole} />
          <Button
            type="button"
            variant="highlight"
            className="w-full"
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Setting up...
              </>
            ) : (
              'Continue to dashboard'
            )}
          </Button>
        </CardContent>
      </Card>
    </PageTransition>
  )
}
