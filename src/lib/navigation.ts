import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  LayoutDashboard,
  Settings,
  ShoppingBag,
} from 'lucide-react'
import type { UserRole } from '@/lib/roles'
import { getDashboardPath } from '@/lib/roles'

export interface NavItem {
  label: string
  path: string
  icon: LucideIcon
}

export function getNavItemsForRole(role: UserRole): NavItem[] {
  const catalog = { label: 'Browse Courses', path: '/catalog', icon: ShoppingBag }

  switch (role) {
    case 'admin':
      return [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        catalog,
        { label: 'Settings', path: '/admin/settings', icon: Settings },
      ]
    case 'teacher':
      return [
        { label: 'My Courses', path: '/teacher/courses', icon: BookOpen },
        catalog,
        { label: 'Settings', path: '/teacher/settings', icon: Settings },
      ]
    case 'student':
    default:
      return [
        { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
        { label: 'My Courses', path: '/student/courses', icon: BookOpen },
        catalog,
        { label: 'Settings', path: '/student/settings', icon: Settings },
      ]
  }
}

export function getSettingsPathForRole(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/admin/settings'
    case 'teacher':
      return '/teacher/settings'
    case 'student':
    default:
      return '/student/settings'
  }
}

export function getProfilePathForRole(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/admin/settings'
    case 'teacher':
      return '/teacher/profile'
    case 'student':
    default:
      return '/student/profile'
  }
}

export function getDashboardLinkForRole(role?: UserRole): string {
  return role ? getDashboardPath(role) : '/dashboard'
}
