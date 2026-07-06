import { useState } from 'react'
import { Search } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { TeacherPageHeader } from '@/components/teacher/TeacherUI'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { teacherStudents } from '@/data/teacherPortal'

export default function StudentsPage() {
  const [search, setSearch] = useState('')

  const filtered = teacherStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <PageTransition>
      <TeacherPageHeader title="Students" description="View and manage enrolled students." />

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <Input placeholder="Search by name, email, or course..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card className="overflow-hidden rounded-[18px]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 text-left text-white/50">
                  <th className="px-5 py-3 font-medium">Student</th>
                  <th className="px-5 py-3 font-medium">Course</th>
                  <th className="px-5 py-3 font-medium">Progress</th>
                  <th className="px-5 py-3 font-medium">Assignments</th>
                  <th className="px-5 py-3 font-medium">Attendance</th>
                  <th className="px-5 py-3 font-medium">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-border/20 hover:bg-bg-secondary/20">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={s.photo} alt={s.name} className="h-9 w-9 rounded-full object-cover" />
                        <div>
                          <p className="font-medium">{s.name}</p>
                          <p className="text-xs text-white/45">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-white/60">{s.course}</td>
                    <td className="px-5 py-4">
                      <div className="w-24">
                        <Progress value={s.progress} className="h-1.5" />
                        <span className="text-xs text-white/45">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-white/60">{s.assignmentsCompleted}/{s.assignmentsTotal}</td>
                    <td className="px-5 py-4 text-white/60">{s.attendance}%</td>
                    <td className="px-5 py-4 text-white/45">{s.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PageTransition>
  )
}
