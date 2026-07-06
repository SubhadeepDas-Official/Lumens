import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getNavItemsForRole, getProfilePathForRole } from '@/lib/navigation'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()
  const { user } = useAuth()
  const navItems = user ? getNavItemsForRole(user.role) : []

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed z-40 w-64 overflow-hidden glass-strong border border-border/30 transition-transform duration-300',
          'left-0 top-20 bottom-4 rounded-r-2xl',
          'lg:left-4 lg:top-4 lg:bottom-4 lg:rounded-2xl',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="mb-2 ml-auto shrink-0 lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>

          <nav className="flex shrink-0 flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
              return (
                <Link key={item.path} to={item.path} onClick={onClose}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'flex items-center gap-3 rounded-[14px] px-4 py-3 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-accent-primary/25 text-white shadow-glow'
                        : 'text-white/60 hover:bg-bg-secondary/60 hover:text-white'
                    )}
                  >
                    <item.icon className={cn('h-5 w-5', isActive && 'text-highlight')} />
                    {item.label}
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {user && (
            <div className="mt-auto shrink-0 border-t border-border/30 pt-4">
              <Link to={getProfilePathForRole(user.role)} onClick={onClose}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex items-center gap-3 rounded-[14px] bg-bg-secondary/40 p-3 transition-colors hover:bg-bg-secondary/60"
                >
                  <Avatar className="h-10 w-10 shrink-0 ring-2 ring-accent-primary/30">
                    <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{user.name}</p>
                    <p className="truncate text-xs text-white/50">{user.email}</p>
                  </div>
                </motion.div>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-primary/30">
                <GraduationCap className="h-4 w-4 text-highlight" />
              </div>
              <span className="text-lg font-semibold">
                Lumen<span className="text-white/50">.</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-white/50">
              Premium online education for the modern learner. Learn without limits.
            </p>
          </div>

          {[
            {
              title: 'Platform',
              links: ['Courses', 'Instructors', 'Pricing', 'Enterprise'],
            },
            {
              title: 'Resources',
              links: ['Blog', 'Help Center', 'Community', 'Webinars'],
            },
            {
              title: 'Company',
              links: ['About', 'Careers', 'Press', 'Contact'],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold text-white">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/50 transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 sm:flex-row">
          <p className="text-sm text-white/40">
            &copy; 2026 Lumen Education. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-sm text-white/40 hover:text-white/70">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
