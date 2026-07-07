import { PageTransition } from '@/components/animations/PageTransition'
import { TeacherPageHeader } from '@/components/teacher/TeacherUI'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { ThemeSelector } from '@/components/theme/ThemeSelector'

export default function TeacherSettingsPage() {
  return (
    <PageTransition>
      <TeacherPageHeader title="Settings" description="Manage your account preferences." />

      <div className="space-y-6">
        <Card className="rounded-[18px]">
          <CardContent className="space-y-4 p-6">
            <h3 className="font-semibold">Account Settings</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Display Name</Label><Input /></div>
              <div className="space-y-2"><Label>Email</Label><Input type="email" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[18px]">
          <CardContent className="space-y-4 p-6">
            <h3 className="font-semibold">Notification Preferences</h3>
            {['New enrollments', 'Assignment submissions', 'Live class reminders', 'Student messages'].map((n) => (
              <div key={n} className="flex items-center justify-between">
                <span className="text-sm">{n}</span>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[18px]">
          <CardContent className="space-y-4 p-6">
            <h3 className="font-semibold">Password Change</h3>
            <div className="space-y-2"><Label>Current Password</Label><Input type="password" /></div>
            <div className="space-y-2"><Label>New Password</Label><Input type="password" /></div>
            <Button variant="outline">Update Password</Button>
          </CardContent>
        </Card>

        <Card className="rounded-[18px]">
          <CardContent className="space-y-4 p-6">
            <h3 className="font-semibold">Theme</h3>
            <p className="text-sm text-fg-muted">Choose how Lumen looks across all pages.</p>
            <ThemeSelector />
          </CardContent>
        </Card>

        <Card className="rounded-[18px]">
          <CardContent className="space-y-4 p-6">
            <h3 className="font-semibold">Privacy & Security</h3>
            <div className="flex items-center justify-between"><span className="text-sm">Profile visibility</span><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><span className="text-sm">Two-Factor Authentication</span><Switch /></div>
            <Separator />
            <h4 className="text-sm font-medium">Connected Accounts</h4>
            <div className="flex items-center justify-between rounded-[12px] border border-border/30 px-4 py-3">
              <span className="text-sm">Google</span>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
