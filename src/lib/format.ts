const INR_LOCALE = 'en-IN'

/** Format amount in Indian Rupees e.g. ₹7,499 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat(INR_LOCALE, {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/** Compact Indian number system: 1.2L, 12.4K, 1.2Cr */
export function formatIndianCount(value: number): string {
  if (value >= 10_000_000) {
    const cr = value / 10_000_000
    return `${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1)}Cr`
  }
  if (value >= 100_000) {
    const lakh = value / 100_000
    return `${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(1)}L`
  }
  if (value >= 1_000) {
    const k = value / 1_000
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K`
  }
  return value.toLocaleString(INR_LOCALE)
}

/** Full Indian grouping e.g. 12,450 */
export function formatIndianNumber(value: number): string {
  return value.toLocaleString(INR_LOCALE)
}

export function formatIndianDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(INR_LOCALE, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
