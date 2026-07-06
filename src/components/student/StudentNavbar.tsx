import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Calendar, Menu, Moon, Search, Sun } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { studentAnnouncements } from '@/data/studentPortal'

interface StudentNavbarProps {
  onMenuToggle: () => void
}

export function StudentNavbar({ onMenuToggle }: StudentNavbarProps) {
  const { user } = useAuth()
  const [darkMode, setDarkMode] = useState(true)
  const unreadCount = studentAnnouncements.filter((a) => a.unread).length

  useEffect(() => {
    document.documentElement.classList.toggle('light', !darkMode)
  }, [darkMode])

  return (
    <header className="sticky top-0 z-30 border-b border-border/30 bg-bg-primary/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <Button variant="ghost" size="icon" onClick={onMenuToggle} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <Input placeholder="Search courses, lessons, assignments..." className="pl-10" />
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" className="relative hidden sm:flex">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-secondary text-[9px] font-bold">
                {unreadCount}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Calendar className="h-5 w-5" />
          </Button>

          <div className="hidden items-center gap-2 rounded-full border border-border/40 bg-bg-secondary/40 px-3 py-1.5 sm:flex">
            {darkMode ? <Moon className="h-3.5 w-3.5 text-white/50" /> : <Sun className="h-3.5 w-3.5 text-white/50" />}
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          {user && (
            <Link to="/student/profile">
              <Avatar className="h-9 w-9 ring-2 ring-accent-primary/30">
                <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
