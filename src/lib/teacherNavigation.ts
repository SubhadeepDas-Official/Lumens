import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  IndianRupee,
  LayoutDashboard,
  LogOut,
  Mail,
  Megaphone,
  PenSquare,
  Settings,
  User,
  UserCheck,
  Users,
  Video,
} from 'lucide-react'

export interface TeacherNavItem {
  label: string
  path: string
  icon: LucideIcon
}

export const teacherNavItems: TeacherNavItem[] = [
  { label: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
  { label: 'My Courses', path: '/teacher/courses', icon: BookOpen },
  { label: 'Create Course', path: '/teacher/courses/create', icon: PenSquare },
  { label: 'Course Content', path: '/teacher/content', icon: FileText },
  { label: 'Live Classes', path: '/teacher/live-classes', icon: Video },
  { label: 'Assignments', path: '/teacher/assignments', icon: ClipboardList },
  { label: 'Students', path: '/teacher/students', icon: Users },
  { label: 'Attendance', path: '/teacher/attendance', icon: UserCheck },
  { label: 'Messages', path: '/teacher/messages', icon: Mail },
  { label: 'Announcements', path: '/teacher/announcements', icon: Megaphone },
  { label: 'Analytics', path: '/teacher/analytics', icon: BarChart3 },
  { label: 'Earnings', path: '/teacher/earnings', icon: IndianRupee },
  { label: 'Profile', path: '/teacher/profile', icon: User },
  { label: 'Settings', path: '/teacher/settings', icon: Settings },
]

export const teacherLogoutItem: TeacherNavItem = {
  label: 'Logout',
  path: '/login',
  icon: LogOut,
}

export const teacherNavbarIcons = {
  notifications: Bell,
  calendar: Calendar,
}
