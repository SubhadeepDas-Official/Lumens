import { Plus, Video } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { AdminPageHeader } from '@/components/admin/AdminUI'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { adminLiveClasses } from '@/data/adminPortal'

export default function AdminLiveClassesPage() {
  const upcoming = adminLiveClasses.filter((c) => c.status === 'upcoming')
  const completed = adminLiveClasses.filter((c) => c.status === 'completed')

  return (
    <PageTransition>
      <AdminPageHeader
        title="Live Classes"
        description="Schedule, manage, and monitor live sessions across the platform."
        action={
          <Button variant="highlight">
            <Plus className="h-4 w-4" />
            Schedule Class
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="rounded-[18px]">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-primary/20">
              <Video className="h-5 w-5 text-highlight" />
            </div>
            <div>
              <p className="text-2xl font-bold">{upcoming.length}</p>
              <p className="text-sm text-white/50">Upcoming Today</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <p className="text-2xl font-bold">{completed.length}</p>
            <p className="text-sm text-white/50">Completed This Week</p>
          </CardContent>
        </Card>
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <p className="text-2xl font-bold">{adminLiveClasses.reduce((s, c) => s + c.attendees, 0)}</p>
            <p className="text-sm text-white/50">Total Attendees</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <ClassTable classes={upcoming} />
        </TabsContent>
        <TabsContent value="completed">
          <ClassTable classes={completed} />
        </TabsContent>
        <TabsContent value="all">
          <ClassTable classes={adminLiveClasses} />
        </TabsContent>
      </Tabs>
    </PageTransition>
  )
}

function ClassTable({ classes }: { classes: typeof adminLiveClasses }) {
  return (
    <Card className="overflow-hidden rounded-[18px]">
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/30 text-left text-white/50">
              <th className="px-5 py-3 font-medium">Class</th>
              <th className="px-5 py-3 font-medium">Course</th>
              <th className="px-5 py-3 font-medium">Teacher</th>
              <th className="px-5 py-3 font-medium">Date & Time</th>
              <th className="px-5 py-3 font-medium">Duration</th>
              <th className="px-5 py-3 font-medium">Attendees</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id} className="border-b border-border/20 hover:bg-bg-secondary/20">
                <td className="px-5 py-4 font-medium">{cls.title}</td>
                <td className="px-5 py-4 text-white/60">{cls.course}</td>
                <td className="px-5 py-4 text-white/60">{cls.teacher}</td>
                <td className="px-5 py-4 text-white/50">
                  {cls.date}
                  <br />
                  <span className="text-xs">{cls.time}</span>
                </td>
                <td className="px-5 py-4 text-white/50">{cls.duration}</td>
                <td className="px-5 py-4">{cls.attendees}</td>
                <td className="px-5 py-4">
                  <Badge
                    variant={cls.status === 'upcoming' ? 'default' : cls.status === 'completed' ? 'success' : 'secondary'}
                    className="capitalize"
                  >
                    {cls.status}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-1">
                    <Button variant="secondary" size="sm" className="rounded-full text-xs">
                      Edit
                    </Button>
                    {cls.status === 'upcoming' && (
                      <Button variant="ghost" size="sm" className="rounded-full text-xs text-red-400">
                        Cancel
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
