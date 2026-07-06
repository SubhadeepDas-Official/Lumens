import { Label } from '@/components/ui/label'
import type { UserRole } from '@/lib/roles'
import { ROLE_LABELS } from '@/lib/roles'
import { cn } from '@/lib/utils'

interface RoleSelectorProps {
  value: UserRole
  onChange: (role: UserRole) => void
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>I am a</Label>
      <div className="grid grid-cols-3 gap-2">
        {(['student', 'teacher', 'admin'] as UserRole[]).map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => onChange(role)}
            className={cn(
              'rounded-[12px] border px-2 py-2.5 text-xs font-medium transition-colors',
              value === role
                ? 'border-accent-secondary bg-accent-primary/20 text-white'
                : 'border-border/40 text-white/50 hover:border-border'
            )}
          >
            {ROLE_LABELS[role]}
          </button>
        ))}
      </div>
    </div>
  )
}
