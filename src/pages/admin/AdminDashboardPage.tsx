import { Link } from 'react-router-dom'
import {
  Activity,
  BookOpen,
  ClipboardCheck,
  IndianRupee,
  UserCheck,
  Users,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/animations/PageTransition'
import { StatCard } from '@/components/teacher/StatCard'
import { AdminPageHeader, SimpleBarChart } from '@/components/admin/AdminUI'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/context/AuthContext'
import {
  adminAnnouncements,
  adminChartData,
  adminStats,
  recentActivities,
} from '@/data/adminPortal'
import { formatINR, formatIndianCount } from '@/lib/format'

const activityIcons = {
  enrollment: Users,
  payment: IndianRupee,
  course: BookOpen,
  teacher: UserCheck,
  system: Activity,
}

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const firstName = user?.name.split(' ')[0] ?? 'Admin'

  return (
    <PageTransition>
      <AdminPageHeader
        title={`Welcome back, ${firstName}`}
        description="Platform overview and key metrics at a glance."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Students" value={formatIndianCount(adminStats.totalStudents)} icon={Users} delay={0} trend="+18%" />
        <StatCard label="Teachers" value={String(adminStats.totalTeachers)} icon={UserCheck} delay={0.05} />
        <StatCard label="Courses" value={String(adminStats.totalCourses)} icon={BookOpen} delay={0.1} />
        <StatCard label="Revenue" value={formatINR(adminStats.totalRevenue)} icon={IndianRupee} delay={0.15} trend="+24%" />
        <StatCard label="Active Users" value={formatIndianCount(adminStats.activeUsers)} icon={Activity} delay={0.2} trend="+6%" />
        <StatCard label="Pending Approvals" value={String(adminStats.pendingApprovals)} icon={ClipboardCheck} delay={0.25} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <h3 className="mb-4 font-semibold">Revenue Trend</h3>
            <SimpleBarChart data={adminChartData.revenue} labels={adminChartData.months} />
            <p className="mt-2 text-xs text-white/40">Values in lakhs (₹)</p>
          </CardContent>
        </Card>

        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <h3 className="mb-4 font-semibold">Student Enrollment</h3>
            <SimpleBarChart data={adminChartData.enrollment} labels={adminChartData.months} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Recent Activity</h3>
              <Link to="/admin/analytics" className="text-xs text-highlight hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity, i) => {
                const Icon = activityIcons[activity.type]
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 rounded-[12px] bg-bg-secondary/30 p-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-primary/20">
                      <Icon className="h-3.5 w-3.5 text-highlight" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{' '}
                        <span className="text-white/60">{activity.action}</span>
                      </p>
                      <p className="text-xs text-white/40">{activity.time}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Latest Announcements</h3>
              <Link to="/admin/announcements" className="text-xs text-highlight hover:underline">
                Manage
              </Link>
            </div>
            <div className="space-y-3">
              {adminAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="rounded-[12px] border border-border/30 bg-bg-secondary/20 p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-medium">{announcement.title}</h4>
                    <Badge
                      variant={announcement.status === 'published' ? 'success' : 'warning'}
                      className="shrink-0 capitalize"
                    >
                      {announcement.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-white/50">{announcement.audience}</p>
                  <p className="mt-2 text-[11px] text-white/40">{announcement.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
