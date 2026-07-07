/** Supabase auth redirect URLs must be allowlisted in the Supabase dashboard. */
export function getAuthRedirectUrl(path = '/auth/callback'): string {
  return `${window.location.origin}${path}`
}
