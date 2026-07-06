import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  BookOpen,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Settings,
  Shield,
  Users,
  UserCheck,
  Video,
} from 'lucide-react'

export interface AdminNavItem {
  label: string
  path: string
  icon: LucideIcon
}

export const adminNavItems: AdminNavItem[] = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Students', path: '/admin/students', icon: Users },
  { label: 'Teachers', path: '/admin/teachers', icon: UserCheck },
  { label: 'Courses', path: '/admin/courses', icon: BookOpen },
  { label: 'Payments', path: '/admin/payments', icon: CreditCard },
  { label: 'Live Classes', path: '/admin/live-classes', icon: Video },
  { label: 'Announcements', path: '/admin/announcements', icon: Megaphone },
  { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
]

export const adminLogoutItem = { label: 'Logout', icon: LogOut }

export const adminBrandIcon = Shield
