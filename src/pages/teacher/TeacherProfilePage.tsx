import { PageTransition } from '@/components/animations/PageTransition'
import { TeacherPageHeader } from '@/components/teacher/TeacherUI'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/context/AuthContext'

export default function TeacherProfilePage() {
  const { user } = useAuth()

  return (
    <PageTransition>
      <TeacherPageHeader
        title="Profile"
        description="Manage your public teacher profile."
        action={<Button variant="highlight">Save Changes</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="rounded-[18px]">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <Avatar className="h-24 w-24 ring-4 ring-accent-primary/30">
              <AvatarFallback className="text-2xl">{user?.avatar}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="mt-4">Change Photo</Button>
            <p className="mt-4 font-semibold">{user?.name}</p>
            <p className="text-sm text-white/50">{user?.email}</p>
          </CardContent>
        </Card>

        <Card className="rounded-[18px]">
          <CardContent className="space-y-4 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Full Name</Label><Input defaultValue={user?.name} /></div>
              <div className="space-y-2"><Label>Email</Label><Input defaultValue={user?.email} disabled /></div>
            </div>
            <div className="space-y-2"><Label>Bio</Label><textarea className="min-h-24 w-full rounded-[16px] border border-border/50 bg-bg-secondary/50 px-4 py-3 text-sm" defaultValue={user?.bio} /></div>
            <div className="space-y-2"><Label>Qualifications</Label><Input placeholder="M.Tech, B.Tech..." /></div>
            <div className="space-y-2"><Label>Experience</Label><Input placeholder="10+ years in software development" /></div>
            <div className="space-y-2"><Label>Expertise</Label><Input placeholder="React, Node.js, Cloud Architecture" /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Phone</Label><Input placeholder="+91 98765 43210" /></div>
              <div className="space-y-2"><Label>Location</Label><Input placeholder="Bangalore, India" /></div>
            </div>
            <div className="space-y-2"><Label>LinkedIn</Label><Input placeholder="https://linkedin.com/in/..." /></div>
            <div className="space-y-2"><Label>Twitter / X</Label><Input placeholder="https://x.com/..." /></div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
