import { Link } from 'react-router-dom'
import {
  BarChart3,
  ClipboardList,
  IndianRupee,
  Megaphone,
  Star,
  Upload,
  Users,
  Video,
} from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { StatCard } from '@/components/teacher/StatCard'
import { TeacherPageHeader } from '@/components/teacher/TeacherUI'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import { teacherStats } from '@/data/teacherPortal'
import { formatINR } from '@/lib/format'

const quickActions = [
  { label: 'Create New Course', path: '/teacher/courses/create', icon: ClipboardList },
  { label: 'Upload Video', path: '/teacher/content', icon: Upload },
  { label: 'Schedule Live Class', path: '/teacher/live-classes', icon: Video },
  { label: 'Create Assignment', path: '/teacher/assignments', icon: ClipboardList },
  { label: 'Make Announcement', path: '/teacher/announcements', icon: Megaphone },
]

export default function TeacherDashboardPage() {
  const { user } = useAuth()
  const firstName = user?.name.split(' ')[0] ?? 'Teacher'

  return (
    <PageTransition>
      <TeacherPageHeader
        title={`Welcome back, ${firstName}`}
        description="Here's what's happening with your courses today."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Students" value={teacherStats.totalStudents.toLocaleString('en-IN')} icon={Users} delay={0} trend="+12%" />
        <StatCard label="Active Courses" value={String(teacherStats.activeCourses)} icon={BarChart3} delay={0.05} />
        <StatCard label="Live Classes Today" value={String(teacherStats.liveClassesToday)} icon={Video} delay={0.1} />
        <StatCard label="Assignments Pending Review" value={String(teacherStats.assignmentsPending)} icon={ClipboardList} delay={0.15} />
        <StatCard label="Total Revenue" value={formatINR(teacherStats.totalRevenue)} icon={IndianRupee} delay={0.2} trend="+8%" />
        <StatCard label="Average Course Rating" value={String(teacherStats.averageRating)} icon={Star} delay={0.25} />
      </div>

      <Card className="mt-6 overflow-hidden rounded-[18px]">
        <CardContent className="p-5">
          <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Link key={action.label} to={action.path}>
                <Button variant="secondary" size="sm" className="rounded-full">
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageTransition>
  )
}
