import { Outlet } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Footer } from './Layout'
import { LandingNavbar, NAVBAR_OFFSET_CLASS } from './LandingNavbar'
import { StudentLayout } from '@/components/student/StudentLayout'
import { TeacherLayout } from '@/components/teacher/TeacherLayout'
import { AdminLayout } from '@/components/admin/AdminLayout'
import type { UserRole } from '@/lib/roles'

function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-highlight" />
    </div>
  )
}

function getPortalLayoutForRole(role: UserRole) {
  switch (role) {
    case 'student':
      return StudentLayout
    case 'teacher':
      return TeacherLayout
    case 'admin':
      return AdminLayout
    default:
      return null
  }
}

function AppShell() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className={`flex-1 ${NAVBAR_OFFSET_CLASS}`}>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export function AppLayout() {
  return <AppShell />
}

export function CatalogLayout() {
  const { isAuthenticated, loading, user, needsRoleSelection } = useAuth()

  if (loading) return <AuthLoading />

  if (isAuthenticated && user && !needsRoleSelection) {
    const PortalLayout = getPortalLayoutForRole(user.role)
    if (PortalLayout) {
      return <PortalLayout />
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className={`flex-1 ${NAVBAR_OFFSET_CLASS}`}>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-bg-secondary p-12 lg:flex">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-accent-primary to-accent-secondary">
            <span className="text-lg font-bold text-white">L</span>
          </div>
          <span className="text-xl font-bold">
            Lumen<span className="text-white/50">.</span>
          </span>
        </div>
        <div>
          <h2 className="text-4xl font-bold leading-tight">
            Learn from the
            <br />
            <span className="gradient-text">best minds</span> in India.
          </h2>
          <p className="mt-4 max-w-md text-white/60">
            Join 1.8 Lakh+ learners already transforming their careers with Lumen.
          </p>
        </div>
        <p className="text-sm text-white/40">
          Trusted by professionals at Flipkart, Razorpay, Zomato, and more.
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center px-4 lg:w-1/2">
        <Outlet />
      </div>
    </div>
  )
}
