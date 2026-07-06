import { PageTransition } from '@/components/animations/PageTransition'
import { SimpleBarChart, TeacherPageHeader } from '@/components/teacher/TeacherUI'
import { Card, CardContent } from '@/components/ui/card'
import { chartData, teacherCourses } from '@/data/teacherPortal'

export default function AnalyticsPage() {
  return (
    <PageTransition>
      <TeacherPageHeader title="Analytics" description="Insights into your teaching performance." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <h3 className="mb-4 font-semibold">Student Enrollment</h3>
            <SimpleBarChart data={chartData.enrollment} labels={chartData.months} />
          </CardContent>
        </Card>
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <h3 className="mb-4 font-semibold">Monthly Revenue</h3>
            <SimpleBarChart data={chartData.revenue.map((r) => r / 1000)} labels={chartData.months} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Course Completion', value: '68%' },
          { label: 'Avg. Watch Time', value: '4.2 hrs/wk' },
          { label: 'Assignment Score', value: '82%' },
          { label: 'Engagement Rate', value: '74%' },
        ].map((s) => (
          <Card key={s.label} className="rounded-[18px]">
            <CardContent className="p-5">
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-sm text-white/50">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 rounded-[18px]">
        <CardContent className="p-5">
          <h3 className="mb-4 font-semibold">Top Performing Courses</h3>
          <div className="space-y-3">
            {teacherCourses.filter((c) => c.status === 'published').slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-[12px] bg-bg-secondary/30 px-4 py-3">
                <span className="text-sm font-medium">{c.title}</span>
                <span className="text-sm text-highlight">{c.students.toLocaleString('en-IN')} students · ★ {c.rating}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageTransition>
  )
}
