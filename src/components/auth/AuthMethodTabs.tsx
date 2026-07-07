import { Mail, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

export type AuthMethod = 'email' | 'phone'

interface AuthMethodTabsProps {
  value: AuthMethod
  onChange: (method: AuthMethod) => void
  className?: string
}

export function AuthMethodTabs({ value, onChange, className }: AuthMethodTabsProps) {
  return (
    <div className={cn('mb-5 grid grid-cols-2 gap-2 rounded-[14px] bg-bg-secondary/40 p-1', className)}>
      <button
        type="button"
        onClick={() => onChange('email')}
        className={cn(
          'flex items-center justify-center gap-2 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-all',
          value === 'email'
            ? 'bg-accent-primary/25 text-white shadow-glow'
            : 'text-white/50 hover:text-white/70'
        )}
      >
        <Mail className="h-4 w-4" />
        Email
      </button>
      <button
        type="button"
        onClick={() => onChange('phone')}
        className={cn(
          'flex items-center justify-center gap-2 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-all',
          value === 'phone'
            ? 'bg-accent-primary/25 text-white shadow-glow'
            : 'text-white/50 hover:text-white/70'
        )}
      >
        <Phone className="h-4 w-4" />
        Phone
      </button>
    </div>
  )
}
