import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Menu } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getDashboardLinkForRole, getProfilePathForRole } from '@/lib/navigation'
import { cn } from '@/lib/utils'

/** Space below fixed pill navbar (pt-5 + nav height) */
export const NAVBAR_OFFSET_CLASS = 'pt-20'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/catalog' },
]

interface LandingNavbarProps {
  onMenuToggle?: () => void
  showMenuButton?: boolean
}

export function LandingNavbar({ onMenuToggle, showMenuButton = false }: LandingNavbarProps) {
  const location = useLocation()
  const { isAuthenticated, user } = useAuth()

  const links = isAuthenticated
    ? [...navLinks, { label: 'Dashboard', href: getDashboardLinkForRole(user?.role) }]
    : navLinks

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname === href || location.pathname.startsWith(`${href}/`)
  }

  const logoHref = isAuthenticated && user ? getDashboardLinkForRole(user.role) : '/'

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-5 sm:px-6"
    >
      <nav className="mx-auto flex max-w-3xl items-center justify-between rounded-full border border-border/40 bg-bg-secondary/40 px-2 py-2 pl-3 shadow-glow backdrop-blur-xl sm:pl-4">
        <div className="flex min-w-0 items-center gap-1">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              className="h-8 w-8 shrink-0 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <Link to={logoHref} className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-primary/30">
              <GraduationCap className="h-4 w-4 text-highlight" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-white">
              Lumen<span className="text-white/50">.</span>
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={cn(
                'rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200',
                isActive(link.href) ? 'bg-white/8 text-white' : 'text-white/50 hover:text-white/80'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {isAuthenticated && user && !showMenuButton ? (
            <Link to={getProfilePathForRole(user.role)}>
              <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-accent-primary/30 transition-all hover:ring-accent-secondary/50">
                <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
              </Avatar>
            </Link>
          ) : !isAuthenticated ? (
            <>
              <Link to="/login" className="hidden sm:block">
                <span className="px-3 text-[13px] font-medium text-white/60 transition-colors hover:text-white">
                  Log in
                </span>
              </Link>
              <Link to="/signup">
                <Button
                  variant="highlight"
                  size="sm"
                  className="rounded-full px-5 text-[13px] shadow-[0_0_24px_rgba(12,150,156,0.25)]"
                >
                  Get started
                </Button>
              </Link>
            </>
          ) : null}
        </div>
      </nav>
    </motion.header>
  )
}
