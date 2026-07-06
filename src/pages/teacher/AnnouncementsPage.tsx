import { Plus } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { TeacherPageHeader } from '@/components/teacher/TeacherUI'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { announcements } from '@/data/teacherPortal'

export default function AnnouncementsPage() {
  return (
    <PageTransition>
      <TeacherPageHeader
        title="Announcements"
        description="Broadcast updates to your students."
        action={<Button variant="highlight"><Plus className="h-4 w-4" />New Announcement</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-[18px]">
          <CardContent className="space-y-4 p-5">
            <h3 className="font-semibold">Create Announcement</h3>
            <div className="space-y-2"><Label>Title</Label><Input placeholder="Announcement title" /></div>
            <div className="space-y-2">
              <Label>Audience</Label>
              <select className="h-11 w-full rounded-[16px] border border-border/50 bg-bg-secondary/50 px-4 text-sm">
                <option>Individual Course</option>
                <option>All Students</option>
                <option>Specific Batch</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <textarea className="min-h-28 w-full rounded-[16px] border border-border/50 bg-bg-secondary/50 px-4 py-3 text-sm" placeholder="Write your announcement..." />
            </div>
            <div className="space-y-2"><Label>Schedule (optional)</Label><Input type="datetime-local" /></div>
            <div className="flex gap-2">
              <Button variant="outline">Save Draft</Button>
              <Button variant="highlight">Publish</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h3 className="font-semibold">Recent Announcements</h3>
          {announcements.map((a) => (
            <Card key={a.id} className="rounded-[18px]">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium">{a.title}</h4>
                  <Badge variant={a.status === 'published' ? 'success' : 'warning'} className="capitalize shrink-0">
                    {a.status}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-white/50">{a.audience}</p>
                <p className="mt-2 text-xs text-white/40">{a.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
