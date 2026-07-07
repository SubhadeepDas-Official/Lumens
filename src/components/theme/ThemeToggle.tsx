import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { Switch } from '@/components/ui/switch'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <div className="hidden items-center gap-2 rounded-full border border-border/40 bg-bg-secondary/40 px-3 py-1.5 sm:flex">
      {isDark ? <Moon className="h-3.5 w-3.5 text-fg-subtle" /> : <Sun className="h-3.5 w-3.5 text-fg-subtle" />}
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        aria-label="Toggle dark mode"
      />
    </div>
  )
}
