import { Download } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { TeacherPageHeader } from '@/components/teacher/TeacherUI'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { liveClasses } from '@/data/teacherPortal'

const records = [
  { student: 'Priya Sharma', class: 'React Hooks Deep Dive', status: 'present' as const },
  { student: 'Arjun Mehta', class: 'React Hooks Deep Dive', status: 'late' as const },
  { student: 'Sneha Reddy', class: 'Design Systems Workshop', status: 'present' as const },
  { student: 'Rahul Verma', class: 'AWS Architecture Q&A', status: 'absent' as const },
]

const statusColors = { present: 'success', late: 'warning', absent: 'secondary' } as const

export default function AttendancePage() {
  return (
    <PageTransition>
      <TeacherPageHeader
        title="Attendance"
        description="Track live class attendance records."
        action={<Button variant="outline"><Download className="h-4 w-4" />Export</Button>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Present', value: '86%', color: 'text-green-400' },
          { label: 'Absent', value: '8%', color: 'text-red-400' },
          { label: 'Late', value: '6%', color: 'text-amber-400' },
          { label: 'Avg. Attendance', value: '91%', color: 'text-highlight' },
        ].map((s) => (
          <Card key={s.label} className="rounded-[18px]">
            <CardContent className="p-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-white/50">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-[18px]">
        <CardContent className="p-0">
          <div className="border-b border-border/30 px-5 py-4">
            <h3 className="font-semibold">Recent Sessions</h3>
          </div>
          {liveClasses.slice(0, 3).map((cls) => (
            <div key={cls.id} className="border-b border-border/20 px-5 py-3 text-sm text-white/60">
              {cls.title} — {cls.date}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-6 rounded-[18px]">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 text-left text-white/50">
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Class</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i} className="border-b border-border/20">
                  <td className="px-5 py-3 font-medium">{r.student}</td>
                  <td className="px-5 py-3 text-white/60">{r.class}</td>
                  <td className="px-5 py-3">
                    <Badge variant={statusColors[r.status]} className="capitalize">{r.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </PageTransition>
  )
}
