import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { teacherLogoutItem, teacherNavItems } from '@/lib/teacherNavigation'
import { getProfilePathForRole } from '@/lib/navigation'
import { cn } from '@/lib/utils'

interface TeacherSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function TeacherSidebar({ isOpen, onClose }: TeacherSidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed z-40 w-64 overflow-hidden glass-strong border border-border/30 transition-transform duration-300',
          'left-0 top-0 bottom-0 rounded-r-2xl lg:left-4 lg:top-4 lg:bottom-4 lg:rounded-2xl',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-full min-h-0 flex-col p-4">
          <div className="mb-4 flex items-center justify-between">
            <Link to="/teacher/dashboard" className="flex items-center gap-2" onClick={onClose}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-primary/30">
                <GraduationCap className="h-4 w-4 text-highlight" />
              </div>
              <span className="text-sm font-semibold">
                Lumen<span className="text-white/50">.</span>
              </span>
            </Link>
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="sidebar-scroll flex-1 min-h-0 space-y-0.5 overflow-y-auto overflow-x-hidden">
            {teacherNavItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== '/teacher/dashboard' && location.pathname.startsWith(item.path))
              return (
                <Link key={item.path} to={item.path} onClick={onClose}>
                  <motion.div
                    whileHover={{ x: 2 }}
                    className={cn(
                      'flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-accent-primary/25 text-white shadow-glow'
                        : 'text-white/55 hover:bg-bg-secondary/60 hover:text-white'
                    )}
                  >
                    <item.icon className={cn('h-4 w-4 shrink-0', isActive && 'text-highlight')} />
                    <span className="truncate">{item.label}</span>
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          <div className="mt-4 shrink-0 space-y-2 border-t border-border/30 pt-4">
            {user && (
              <Link to={getProfilePathForRole(user.role)} onClick={onClose}>
                <div className="mb-2 flex items-center gap-3 rounded-[12px] bg-bg-secondary/40 p-3 transition-colors hover:bg-bg-secondary/60">
                  <Avatar className="h-9 w-9 ring-2 ring-accent-primary/30">
                    <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-[11px] text-white/45">Teacher</p>
                  </div>
                </div>
              </Link>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium text-white/55 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <teacherLogoutItem.icon className="h-4 w-4" />
              {teacherLogoutItem.label}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
