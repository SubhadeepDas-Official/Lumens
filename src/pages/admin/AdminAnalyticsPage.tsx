import { PageTransition } from '@/components/animations/PageTransition'
import { AdminPageHeader, SimpleBarChart } from '@/components/admin/AdminUI'
import { Card, CardContent } from '@/components/ui/card'
import { adminChartData, adminStats } from '@/data/adminPortal'
import { formatINR, formatIndianCount } from '@/lib/format'

export default function AdminAnalyticsPage() {
  return (
    <PageTransition>
      <AdminPageHeader title="Analytics" description="Platform insights, trends, and performance metrics." />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Students', value: formatIndianCount(adminStats.totalStudents) },
          { label: 'Monthly Revenue', value: formatINR(2840000) },
          { label: 'Course Completion', value: '68%' },
          { label: 'Engagement Score', value: '86%' },
        ].map((metric) => (
          <Card key={metric.label} className="rounded-[18px]">
            <CardContent className="p-5">
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-sm text-white/50">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <h3 className="mb-4 font-semibold">Student Growth</h3>
            <SimpleBarChart data={adminChartData.enrollment} labels={adminChartData.months} />
          </CardContent>
        </Card>

        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <h3 className="mb-4 font-semibold">Revenue Trends</h3>
            <SimpleBarChart data={adminChartData.revenue} labels={adminChartData.months} />
            <p className="mt-2 text-xs text-white/40">Values in lakhs (₹)</p>
          </CardContent>
        </Card>

        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <h3 className="mb-4 font-semibold">Course Popularity</h3>
            <div className="space-y-3">
              {adminChartData.coursePopularity.map((course) => (
                <div key={course.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-white/70">{course.name}</span>
                    <span className="text-highlight">{course.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                      style={{ width: `${course.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <h3 className="mb-4 font-semibold">Teacher Performance</h3>
            <div className="space-y-3">
              {adminChartData.teacherPerformance.map((teacher) => (
                <div
                  key={teacher.name}
                  className="flex items-center justify-between rounded-[12px] bg-bg-secondary/30 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{teacher.name}</p>
                    <p className="text-xs text-white/45">{teacher.students.toLocaleString('en-IN')} students</p>
                  </div>
                  <span className="text-highlight">{teacher.rating}★</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 rounded-[18px]">
        <CardContent className="p-5">
          <h3 className="mb-4 font-semibold">User Engagement</h3>
          <SimpleBarChart data={adminChartData.engagement} labels={adminChartData.months} />
          <p className="mt-2 text-xs text-white/40">Monthly engagement score (%)</p>
        </CardContent>
      </Card>
    </PageTransition>
  )
}
