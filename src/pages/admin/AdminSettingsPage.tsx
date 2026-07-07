import { PageTransition } from '@/components/animations/PageTransition'
import { AdminPageHeader } from '@/components/admin/AdminUI'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeSelector } from '@/components/theme/ThemeSelector'

export default function AdminSettingsPage() {
  return (
    <PageTransition>
      <AdminPageHeader title="Settings" description="Configure institute settings, security, and preferences." />

      <Tabs defaultValue="institute">
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="institute">Institute</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="institute">
          <Card className="rounded-[18px]">
            <CardContent className="space-y-6 p-6">
              <div>
                <h3 className="font-semibold">Institute Information</h3>
                <p className="text-sm text-white/50">Basic details about your learning platform.</p>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Institute Name</Label>
                  <Input defaultValue="Lumen Learning" />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input defaultValue="admin@lumen.learn" type="email" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Address</Label>
                  <Input defaultValue="Bangalore, Karnataka, India" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Description</Label>
                  <textarea
                    className="min-h-24 w-full rounded-[16px] border border-border/50 bg-bg-secondary/50 px-4 py-3 text-sm"
                    defaultValue="Premium online learning platform for Indian students."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Logo Upload</Label>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-primary/20 text-lg font-bold text-highlight">
                    L
                  </div>
                  <Button variant="secondary" className="rounded-full">
                    Upload Logo
                  </Button>
                </div>
              </div>
              <Button variant="highlight">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme">
          <Card className="rounded-[18px]">
            <CardContent className="space-y-6 p-6">
              <div>
                <h3 className="font-semibold">Theme Settings</h3>
                <p className="text-sm text-fg-muted">Applies across the entire admin portal and public pages.</p>
              </div>
              <Separator />
              <ThemeSelector />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="rounded-[18px]">
            <CardContent className="space-y-6 p-6">
              <div>
                <h3 className="font-semibold">Notification Preferences</h3>
                <p className="text-sm text-white/50">Control admin notification alerts.</p>
              </div>
              <Separator />
              {[
                { label: 'New student enrollments', desc: 'Get notified when students enroll' },
                { label: 'Teacher applications', desc: 'Alert on pending teacher approvals' },
                { label: 'Payment received', desc: 'Notify on successful payments' },
                { label: 'Refund requests', desc: 'Alert on new refund requests' },
                { label: 'System alerts', desc: 'Platform health and maintenance' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-white/45">{item.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
              <Button variant="highlight">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="rounded-[18px]">
            <CardContent className="space-y-6 p-6">
              <div>
                <h3 className="font-semibold">Security Settings</h3>
                <p className="text-sm text-white/50">Protect your admin account and platform.</p>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-white/45">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Connected Accounts</p>
                  <p className="text-xs text-white/45">Google · Connected</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-full">
                  Manage
                </Button>
              </div>
              <Button variant="highlight">Update Security</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTransition>
  )
}
