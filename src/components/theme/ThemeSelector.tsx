import { useTheme, type ThemePreference } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

const OPTIONS: { id: ThemePreference; label: string; description: string }[] = [
  { id: 'dark', label: 'Dark', description: 'Deep teal interface' },
  { id: 'light', label: 'Light', description: 'Bright, clean interface' },
  { id: 'system', label: 'System', description: 'Match device settings' },
]

interface ThemeSelectorProps {
  className?: string
}

export function ThemeSelector({ className }: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className={cn('grid grid-cols-1 gap-3 sm:grid-cols-3', className)}>
      {OPTIONS.map((option) => {
        const active = theme === option.id
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setTheme(option.id)}
            className={cn(
              'rounded-[16px] border p-4 text-left text-sm transition-all',
              active
                ? 'border-accent-secondary bg-accent-primary/20 text-fg shadow-glow'
                : 'border-border/40 text-fg-muted hover:border-border hover:bg-bg-secondary/40'
            )}
          >
            <span className="font-medium">{option.label}</span>
            <span className="mt-1 block text-xs text-fg-subtle">{option.description}</span>
            {active && <span className="mt-2 block text-xs text-highlight">Active</span>}
          </button>
        )
      })}
    </div>
  )
}
