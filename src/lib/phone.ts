/** Normalize Indian/local input to E.164 (+91XXXXXXXXXX). */
export function normalizePhoneToE164(input: string, defaultCountryCode = '91'): string {
  const digits = input.replace(/\D/g, '')

  if (digits.startsWith(defaultCountryCode) && digits.length === 12) {
    return `+${digits}`
  }
  if (digits.length === 10) {
    return `+${defaultCountryCode}${digits}`
  }
  if (input.trim().startsWith('+') && digits.length >= 10) {
    return `+${digits}`
  }

  return `+${digits}`
}

export function isValidPhone(input: string): boolean {
  const normalized = normalizePhoneToE164(input)
  return /^\+[1-9]\d{9,14}$/.test(normalized)
}

export function formatPhoneDisplay(e164: string): string {
  if (e164.startsWith('+91') && e164.length === 13) {
    return `+91 ${e164.slice(3, 8)} ${e164.slice(8)}`
  }
  return e164
}
