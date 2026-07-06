import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { PageTransition, FadeIn } from '@/components/animations/PageTransition'
import { StudentPageHeader } from '@/components/student/StudentUI'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bell, Lock, Palette, Shield, User } from 'lucide-react'

export default function StudentSettingsPage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    courseUpdates: true,
  })

  return (
    <PageTransition>
      <StudentPageHeader title="Settings" description="Manage your account, privacy, and preferences." />

      <FadeIn delay={0.1}>
        <Tabs defaultValue="account">
          <TabsList className="mb-6 flex-wrap">
            <TabsTrigger value="account" className="gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="h-4 w-4" />
              Theme
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card className="rounded-[18px]">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Update your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <Button variant="highlight">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="rounded-[18px]">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { key: 'email' as const, label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'push' as const, label: 'Push Notifications', desc: 'Browser push notifications' },
                  { key: 'courseUpdates' as const, label: 'Course Updates', desc: 'New lessons and announcements' },
                  { key: 'marketing' as const, label: 'Marketing Emails', desc: 'Promotions and new courses' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-white/50">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key]}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, [item.key]: checked }))
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="rounded-[18px]">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control your data and visibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: 'Show profile to other students', desc: 'Allow classmates to see your profile' },
                  { label: 'Show learning activity', desc: 'Display progress on leaderboards' },
                  { label: 'Allow course recommendations', desc: 'Personalized course suggestions' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-white/50">{item.desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="rounded-[18px]">
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <Button variant="highlight">
                  <Lock className="h-4 w-4" />
                  Update Password
                </Button>
                <Separator className="my-6" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-white/50">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Enable
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="rounded-[18px]">
              <CardHeader>
                <CardTitle>Theme Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'Dark', active: true },
                    { name: 'Light', active: false },
                    { name: 'System', active: false },
                  ].map((theme) => (
                    <button
                      key={theme.name}
                      type="button"
                      className={`rounded-[16px] border p-4 text-center text-sm transition-all ${
                        theme.active
                          ? 'border-accent-secondary bg-accent-primary/20 text-white'
                          : 'border-border/40 text-white/50 hover:border-border'
                      }`}
                    >
                      {theme.name}
                      {theme.active && (
                        <span className="mt-1 block text-xs text-highlight">Active</span>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </PageTransition>
  )
}
