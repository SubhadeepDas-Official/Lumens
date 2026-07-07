import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type ThemePreference = 'dark' | 'light' | 'system'

const STORAGE_KEY = 'lumen-theme'

interface ThemeContextValue {
  theme: ThemePreference
  resolvedTheme: 'dark' | 'light'
  setTheme: (theme: ThemePreference) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function getSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredTheme(): ThemePreference {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light' || stored === 'system') return stored
  return 'dark'
}

function resolveTheme(theme: ThemePreference): 'dark' | 'light' {
  return theme === 'system' ? getSystemTheme() : theme
}

function applyTheme(resolved: 'dark' | 'light') {
  const root = document.documentElement
  root.classList.toggle('light', resolved === 'light')
  root.classList.toggle('dark', resolved === 'dark')
  root.style.colorScheme = resolved
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>(getStoredTheme)
  const resolvedTheme = useMemo(() => resolveTheme(theme), [theme])

  useEffect(() => {
    applyTheme(resolvedTheme)
  }, [resolvedTheme])

  useEffect(() => {
    if (theme !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme(resolveTheme('system'))
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [theme])

  const setTheme = useCallback((next: ThemePreference) => {
    setThemeState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

/** Apply saved theme before React paints (call from main.tsx). */
export function initTheme() {
  applyTheme(resolveTheme(getStoredTheme()))
}
