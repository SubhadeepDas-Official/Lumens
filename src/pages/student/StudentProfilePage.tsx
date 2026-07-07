import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { PageTransition, FadeIn } from '@/components/animations/PageTransition'
import { StudentPageHeader } from '@/components/student/StudentUI'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  Edit3,
  Flame,
  Mail,
  MapPin,
  Trophy,
} from 'lucide-react'
import { getEnrolledCoursesWithMeta, studentStats } from '@/data/studentPortal'

export default function StudentProfilePage() {
  const { user, updateProfile } = useAuth()
  const enrolled = getEnrolledCoursesWithMeta()
  const [bio, setBio] = useState(user?.bio ?? '')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setBio(user?.bio ?? '')
  }, [user?.bio])

  if (!user) return null

  const handleSaveBio = async () => {
    setError('')
    setMessage('')
    setSaving(true)
    const result = await updateProfile({ bio: bio.trim() })
    setSaving(false)
    if (result.success) {
      setMessage('Bio saved successfully.')
    } else {
      setError(result.error)
    }
  }

  return (
    <PageTransition>
      <StudentPageHeader title="Profile" description="Manage your personal information and learning stats." />

      <FadeIn>
        <div className="flex flex-col gap-6 lg:flex-row">
          <Card className="w-full shrink-0 rounded-[18px] lg:w-80">
            <CardContent className="p-8 text-center">
              <Avatar className="mx-auto h-24 w-24 ring-2 ring-accent-primary/30">
                <AvatarFallback className="text-2xl">{user.avatar}</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-white/50">Student</p>
              <Badge className="mt-3">Pro Member</Badge>

              <div className="mt-6 space-y-3 text-left text-sm">
                <div className="flex items-center gap-3 text-white/60">
                  <Mail className="h-4 w-4 shrink-0" />
                  {user.email}
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <Calendar className="h-4 w-4 shrink-0" />
                  Joined {user.joinedDate}
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <MapPin className="h-4 w-4 shrink-0" />
                  Bengaluru, India
                </div>
              </div>

              <Link to="/student/settings">
                <Button variant="outline" className="mt-6 w-full rounded-full">
                  <Edit3 className="h-4 w-4" />
                  Account Settings
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="flex-1 space-y-6">
            <Card className="rounded-[18px]">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={user.name} readOnly disabled />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user.email} type="email" readOnly disabled />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="min-h-24 w-full rounded-[16px] border border-border/50 bg-bg-secondary/50 px-4 py-3 text-sm"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell others about yourself..."
                  />
                </div>
                {message && (
                  <p className="sm:col-span-2 text-sm text-highlight">{message}</p>
                )}
                {error && (
                  <p className="sm:col-span-2 text-sm text-red-400">{error}</p>
                )}
                <Button
                  variant="highlight"
                  className="sm:col-span-2 w-fit"
                  onClick={handleSaveBio}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Courses Enrolled', value: enrolled.length, icon: BookOpen },
                { label: 'Hours Learned', value: studentStats.hoursLearned, icon: Clock },
                { label: 'Certificates', value: studentStats.certificatesEarned, icon: Award },
                { label: 'Day Streak', value: studentStats.learningStreak, icon: Flame },
              ].map((stat) => (
                <Card key={stat.label} className="rounded-[18px]">
                  <CardContent className="flex items-center gap-3 p-5">
                    <stat.icon className="h-5 w-5 text-highlight" />
                    <div>
                      <p className="text-xl font-bold">{stat.value}</p>
                      <p className="text-xs text-white/50">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="rounded-[18px]">
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'Fast Learner', desc: 'Completed 5 lessons in one day', date: '2 days ago' },
                  { title: 'Streak Master', desc: '12-day learning streak', date: 'Ongoing' },
                ].map((achievement, i) => (
                  <div key={achievement.title}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-accent-primary/20">
                          <Trophy className="h-5 w-5 text-highlight" />
                        </div>
                        <div>
                          <p className="font-medium">{achievement.title}</p>
                          <p className="text-sm text-white/50">{achievement.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs text-white/40">{achievement.date}</span>
                    </div>
                    {i < 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </FadeIn>
    </PageTransition>
  )
}
