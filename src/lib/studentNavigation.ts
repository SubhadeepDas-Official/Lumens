import type { LucideIcon } from 'lucide-react'
import {
  Award,
  BookOpen,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
  User,
  Video,
} from 'lucide-react'

export interface StudentNavItem {
  label: string
  path: string
  icon: LucideIcon
}

export const studentNavItems: StudentNavItem[] = [
  { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
  { label: 'My Courses', path: '/student/courses', icon: BookOpen },
  { label: 'Live Classes', path: '/student/live-classes', icon: Video },
  { label: 'Assignments', path: '/student/assignments', icon: ClipboardList },
  { label: 'Certificates', path: '/student/certificates', icon: Award },
  { label: 'Purchases', path: '/student/purchases', icon: CreditCard },
  { label: 'Browse Courses', path: '/catalog', icon: ShoppingBag },
  { label: 'Profile', path: '/student/profile', icon: User },
  { label: 'Settings', path: '/student/settings', icon: Settings },
]

export const studentLogoutItem = { label: 'Logout', icon: LogOut }
