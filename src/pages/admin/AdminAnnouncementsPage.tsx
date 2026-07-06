import { Pencil, Plus, Trash2 } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { AdminPageHeader } from '@/components/admin/AdminUI'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { adminAnnouncements } from '@/data/adminPortal'

export default function AdminAnnouncementsPage() {
  return (
    <PageTransition>
      <AdminPageHeader
        title="Announcements"
        description="Create and manage platform-wide announcements."
        action={
          <Button variant="highlight">
            <Plus className="h-4 w-4" />
            New Announcement
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-[18px]">
          <CardContent className="space-y-4 p-5">
            <h3 className="font-semibold">Create Announcement</h3>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="Announcement title" />
            </div>
            <div className="space-y-2">
              <Label>Audience</Label>
              <select className="h-11 w-full rounded-[16px] border border-border/50 bg-bg-secondary/50 px-4 text-sm">
                <option>All Users</option>
                <option>All Students</option>
                <option>All Teachers</option>
                <option>Specific Course</option>
                <option>Selected Batch</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <textarea
                className="min-h-32 w-full rounded-[16px] border border-border/50 bg-bg-secondary/50 px-4 py-3 text-sm"
                placeholder="Write your announcement with rich formatting..."
              />
            </div>
            <div className="space-y-2">
              <Label>Schedule (optional)</Label>
              <Input type="datetime-local" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Save Draft</Button>
              <Button variant="highlight">Publish</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h3 className="font-semibold">All Announcements</h3>
          {adminAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="rounded-[18px]">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium">{announcement.title}</h4>
                    <p className="mt-1 text-sm text-white/50">{announcement.audience}</p>
                    <p className="mt-2 text-xs text-white/40">
                      By {announcement.author} · {announcement.date}
                    </p>
                  </div>
                  <Badge
                    variant={announcement.status === 'published' ? 'success' : 'warning'}
                    className="shrink-0 capitalize"
                  >
                    {announcement.status}
                  </Badge>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="secondary" size="sm" className="rounded-full">
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-full text-red-400">
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
