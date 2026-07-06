import { Navigate, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { getDashboardPath, type UserRole } from '@/lib/roles'
import type { ReactNode } from 'react'

function AuthLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-highlight" />
    </div>
  )
}

interface ProtectedRouteProps {
  children: ReactNode
  roles?: UserRole[]
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { isAuthenticated, loading, user, needsEmailVerification, needsRoleSelection, authUser } =
    useAuth()
  const location = useLocation()

  if (loading) return <AuthLoading />

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (needsEmailVerification && location.pathname !== '/verify-email') {
    return <Navigate to="/verify-email" replace />
  }

  if (needsRoleSelection) {
    return <Navigate to="/select-role" replace />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to={getDashboardPath(user.role)} replace />
  }

  return <>{children}</>
}

interface PublicOnlyRouteProps {
  children: ReactNode
}

export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { isAuthenticated, loading, user, needsEmailVerification, needsRoleSelection, authUser } =
    useAuth()

  if (loading) return <AuthLoading />

  if (authUser) {
    if (needsEmailVerification) {
      return <Navigate to="/verify-email" replace />
    }
    if (needsRoleSelection) {
      return <Navigate to="/select-role" replace />
    }
    if (isAuthenticated && user) {
      return <Navigate to={getDashboardPath(user.role)} replace />
    }
  }

  return <>{children}</>
}

export function RoleSelectionRoute({ children }: { children: ReactNode }) {
  const { loading, authUser, user, needsEmailVerification, needsRoleSelection } = useAuth()

  if (loading) return <AuthLoading />

  if (!authUser) {
    return <Navigate to="/login" replace />
  }

  if (needsEmailVerification) {
    return <Navigate to="/verify-email" replace />
  }

  if (!needsRoleSelection && user) {
    return <Navigate to={getDashboardPath(user.role)} replace />
  }

  return <>{children}</>
}

export function DashboardRedirect() {
  const { user, loading, authUser, needsRoleSelection, needsEmailVerification } = useAuth()

  if (loading) return <AuthLoading />
  if (!authUser) return <Navigate to="/login" replace />
  if (needsEmailVerification) return <Navigate to="/verify-email" replace />
  if (needsRoleSelection) return <Navigate to="/select-role" replace />
  if (!user) return <Navigate to="/select-role" replace />

  return <Navigate to={getDashboardPath(user.role)} replace />
}
