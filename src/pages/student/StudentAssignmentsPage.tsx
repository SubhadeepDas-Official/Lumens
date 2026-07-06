import { PageTransition } from '@/components/animations/PageTransition'
import { StudentPageHeader } from '@/components/student/StudentUI'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { studentAssignments } from '@/data/studentPortal'

export default function StudentAssignmentsPage() {
  const pending = studentAssignments.filter((a) => a.status === 'pending')
  const submitted = studentAssignments.filter((a) => a.status === 'submitted')
  const graded = studentAssignments.filter((a) => a.status === 'graded')

  return (
    <PageTransition>
      <StudentPageHeader
        title="Assignments & Quizzes"
        description={`${pending.length} pending · ${graded.length} graded`}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <p className="text-2xl font-bold text-amber-400">{pending.length}</p>
            <p className="text-sm text-white/50">Pending</p>
          </CardContent>
        </Card>
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <p className="text-2xl font-bold">{submitted.length}</p>
            <p className="text-sm text-white/50">Submitted</p>
          </CardContent>
        </Card>
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <p className="text-2xl font-bold text-highlight">
              {graded.length > 0
                ? Math.round(graded.reduce((s, a) => s + (a.score ?? 0), 0) / graded.length)
                : 0}
              %
            </p>
            <p className="text-sm text-white/50">Avg. Quiz Score</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({submitted.length})</TabsTrigger>
          <TabsTrigger value="graded">Graded ({graded.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <AssignmentList items={pending} showSubmit />
        </TabsContent>
        <TabsContent value="submitted">
          <AssignmentList items={submitted} />
        </TabsContent>
        <TabsContent value="graded">
          <AssignmentList items={graded} showFeedback />
        </TabsContent>
      </Tabs>
    </PageTransition>
  )
}

function AssignmentList({
  items,
  showSubmit,
  showFeedback,
}: {
  items: typeof studentAssignments
  showSubmit?: boolean
  showFeedback?: boolean
}) {
  if (items.length === 0) {
    return (
      <Card className="rounded-[18px]">
        <CardContent className="py-16 text-center text-white/50">No items here.</CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="rounded-[18px]">
          <CardContent className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{item.title}</h4>
                  <Badge variant="secondary" className="capitalize">
                    {item.type}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-white/50">{item.course}</p>
                <p className="mt-2 text-xs text-white/40">Due: {item.deadline}</p>
                {item.score !== undefined && (
                  <p className="mt-2 text-sm">
                    Score: <span className="font-medium text-highlight">{item.score}/{item.maxScore}</span>
                  </p>
                )}
                {showFeedback && item.feedback && (
                  <div className="mt-3 rounded-[12px] bg-bg-secondary/30 p-3">
                    <p className="text-xs text-white/50">Teacher Feedback</p>
                    <p className="mt-1 text-sm text-white/70">{item.feedback}</p>
                  </div>
                )}
              </div>
              {showSubmit && (
                <Button variant="highlight" size="sm" className="shrink-0 rounded-full">
                  Submit
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
