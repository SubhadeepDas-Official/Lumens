export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8
}

export function isValidOtp(code: string): boolean {
  return /^\d{6}$/.test(code.trim())
}

export type AuthResult =
  | {
      success: true
      role?: import('@/lib/roles').UserRole
      needsEmailVerification?: boolean
      needsRoleSelection?: boolean
    }
  | { success: false; error: string }
