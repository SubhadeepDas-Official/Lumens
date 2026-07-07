export function getAuthErrorMessage(error: unknown): string {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code: string }).code)
      : ''
  const message = error instanceof Error ? error.message : String(error ?? '')

  switch (code) {
    case 'invalid_credentials':
    case 'invalid_grant':
      return 'Invalid email or password.'
    case 'user_not_found':
      return 'No account found with this email.'
    case 'email_exists':
    case 'user_already_exists':
      return 'An account with this email already exists.'
    case 'weak_password':
      return 'Password must be at least 8 characters.'
    case 'over_request_rate_limit':
    case 'too_many_requests':
    case 'email_rate_limit_exceeded':
      return 'Too many attempts. Please try again later.'
    case 'email_not_confirmed':
      return 'Please verify your email before signing in.'
    case 'sms_send_failed':
      return 'Could not send SMS. Enable Phone auth and SMS in your Supabase project.'
    case 'phone_provider_disabled':
      return 'Phone sign-in is not enabled. Enable Phone auth in Supabase Authentication settings.'
    case 'validation_failed':
      return 'Please enter a valid email address.'
    case '42501':
    case 'PGRST301':
      return 'Database access denied. Check Supabase row-level security policies.'
    default: {
      if (message.includes('Invalid login credentials')) {
        return 'Invalid email or password.'
      }
      if (message.includes('Email not confirmed')) {
        return 'Please verify your email before signing in.'
      }
      if (message.includes('SMS') || message.includes('phone')) {
        return 'Could not send SMS. Enable Phone auth in Supabase and configure an SMS provider.'
      }
      if (message.includes('row-level security') || message.includes('permission denied')) {
        return 'Database access denied. Check Supabase RLS policies for the profiles table.'
      }
      return message || 'Something went wrong. Please try again.'
    }
  }
}
