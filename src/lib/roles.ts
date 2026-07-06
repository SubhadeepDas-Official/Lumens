export type UserRole = 'admin' | 'teacher' | 'student'

export const ROLE_DASHBOARD_PATHS: Record<UserRole, string> = {
  admin: '/admin/dashboard',
  teacher: '/teacher/dashboard',
  student: '/student/dashboard',
}

export function getDashboardPath(role: UserRole): string {
  return ROLE_DASHBOARD_PATHS[role]
}

export function isUserRole(value: string): value is UserRole {
  return value === 'admin' || value === 'teacher' || value === 'student'
}

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Admin',
  teacher: 'Teacher',
  student: 'Student',
}
