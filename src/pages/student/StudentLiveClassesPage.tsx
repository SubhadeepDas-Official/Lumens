import { Calendar, ExternalLink, Video } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { StudentPageHeader } from '@/components/student/StudentUI'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { studentLiveClasses } from '@/data/studentPortal'

export default function StudentLiveClassesPage() {
  const upcoming = studentLiveClasses.filter((c) => c.status === 'upcoming')
  const past = studentLiveClasses.filter((c) => c.status === 'past')

  return (
    <PageTransition>
      <StudentPageHeader
        title="Live Classes"
        description="Join live sessions and review recorded classes."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="rounded-[18px]">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-primary/20">
              <Video className="h-5 w-5 text-highlight" />
            </div>
            <div>
              <p className="text-2xl font-bold">{upcoming.length}</p>
              <p className="text-sm text-white/50">Upcoming</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <p className="text-2xl font-bold">{past.filter((c) => c.attended).length}</p>
            <p className="text-sm text-white/50">Attended</p>
          </CardContent>
        </Card>
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <p className="text-2xl font-bold">{past.filter((c) => c.recording).length}</p>
            <p className="text-sm text-white/50">Recordings</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 rounded-[18px]">
        <CardContent className="p-5">
          <h3 className="mb-4 flex items-center gap-2 font-semibold">
            <Calendar className="h-4 w-4 text-highlight" />
            This Week
          </h3>
          <div className="grid gap-2 sm:grid-cols-7">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div
                key={day}
                className={`rounded-[12px] p-3 text-center text-sm ${
                  i === 1 ? 'bg-accent-primary/25 ring-1 ring-accent-secondary/30' : 'bg-bg-secondary/30'
                }`}
              >
                <p className="text-xs text-white/50">{day}</p>
                <p className="mt-1 font-medium">{i === 1 ? '2' : i === 4 ? '1' : '—'}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Past & Recordings</TabsTrigger>
          <TabsTrigger value="attendance">Attendance History</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="space-y-4">
            {upcoming.map((cls) => (
              <Card key={cls.id} className="rounded-[18px]">
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="font-semibold">{cls.title}</h4>
                    <p className="text-sm text-white/50">{cls.course}</p>
                    <p className="mt-1 text-xs text-white/40">
                      {cls.instructor} · {cls.date} at {cls.time} · {cls.duration}
                    </p>
                  </div>
                  <Button variant="highlight" className="shrink-0 rounded-full">
                    <ExternalLink className="h-4 w-4" />
                    Join Live Class
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="space-y-4">
            {past.map((cls) => (
              <Card key={cls.id} className="rounded-[18px]">
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="font-semibold">{cls.title}</h4>
                    <p className="text-sm text-white/50">{cls.course}</p>
                    <p className="mt-1 text-xs text-white/40">
                      {cls.date} · {cls.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {cls.attended && <Badge variant="success">Attended</Badge>}
                    {cls.recording && (
                      <Button variant="secondary" size="sm" className="rounded-full">
                        Watch Recording
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="attendance">
          <Card className="overflow-hidden rounded-[18px]">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30 text-left text-white/50">
                    <th className="px-5 py-3 font-medium">Class</th>
                    <th className="px-5 py-3 font-medium">Course</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {past.map((cls) => (
                    <tr key={cls.id} className="border-b border-border/20">
                      <td className="px-5 py-4 font-medium">{cls.title}</td>
                      <td className="px-5 py-4 text-white/60">{cls.course}</td>
                      <td className="px-5 py-4 text-white/50">{cls.date}</td>
                      <td className="px-5 py-4">
                        <Badge variant={cls.attended ? 'success' : 'warning'}>
                          {cls.attended ? 'Present' : 'Absent'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTransition>
  )
}
