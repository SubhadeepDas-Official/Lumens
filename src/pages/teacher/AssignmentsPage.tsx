import { Clock, FileUp, Plus } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { TeacherPageHeader } from '@/components/teacher/TeacherUI'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { assignments } from '@/data/teacherPortal'

export default function AssignmentsPage() {
  const totalPending = assignments.reduce((a, b) => a + b.pending, 0)

  return (
    <PageTransition>
      <TeacherPageHeader
        title="Assignments"
        description="Create, review, and grade student submissions."
        action={<Button variant="highlight"><Plus className="h-4 w-4" />Create Assignment</Button>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="rounded-[18px]"><CardContent className="p-5"><p className="text-2xl font-bold">{assignments.length}</p><p className="text-sm text-white/50">Total Assignments</p></CardContent></Card>
        <Card className="rounded-[18px]"><CardContent className="p-5"><p className="text-2xl font-bold text-amber-400">{totalPending}</p><p className="text-sm text-white/50">Pending Review</p></CardContent></Card>
        <Card className="rounded-[18px]"><CardContent className="p-5"><p className="text-2xl font-bold">{assignments.reduce((a, b) => a + b.submissions, 0)}</p><p className="text-sm text-white/50">Total Submissions</p></CardContent></Card>
      </div>

      <div className="space-y-3">
        {assignments.map((a) => (
          <Card key={a.id} className="rounded-[18px]">
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-white/50">{a.course}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/45">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />Due {a.deadline}</span>
                  <span>{a.submissions} submissions</span>
                  <Badge variant={a.pending > 0 ? 'warning' : 'success'}>{a.pending} pending</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline"><FileUp className="h-3.5 w-3.5" />Upload</Button>
                <Button size="sm" variant="highlight">Review & Grade</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageTransition>
  )
}
