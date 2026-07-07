import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { PageTransition, FadeIn } from '@/components/animations/PageTransition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeSelector } from '@/components/theme/ThemeSelector'
import { Bell, Lock, LogOut, Palette, Shield, User } from 'lucide-react'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    courseUpdates: true,
  })

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <PageTransition>
      <FadeIn>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-white/60">Manage your account and preferences</p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-8">
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
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
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="flex w-full rounded-[16px] border border-border/50 bg-bg-secondary/50 px-4 py-3 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary/40"
                  />
                </div>
                <Button variant="highlight">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what you want to be notified about</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { key: 'email' as const, label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'push' as const, label: 'Push Notifications', desc: 'Browser push notifications' },
                  { key: 'courseUpdates' as const, label: 'Course Updates', desc: 'New lessons and course announcements' },
                  { key: 'marketing' as const, label: 'Marketing Emails', desc: 'Promotions and new course launches' },
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

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm new password" />
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
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how Lumens looks for you</CardDescription>
              </CardHeader>
              <CardContent>
                <ThemeSelector />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6 border-red-500/20">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="font-medium text-red-400">Sign Out</p>
              <p className="text-sm text-white/50">Sign out of your Lumens account</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </FadeIn>
    </PageTransition>
  )
}
