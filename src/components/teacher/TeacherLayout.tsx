import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { TeacherNavbar } from './TeacherNavbar'
import { TeacherSidebar } from './TeacherSidebar'

export function TeacherLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-bg-primary">
      <TeacherSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-72">
        <TeacherNavbar onMenuToggle={() => setSidebarOpen(true)} />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
