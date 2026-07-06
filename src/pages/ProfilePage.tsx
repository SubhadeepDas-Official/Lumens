import { useAuth } from '@/context/AuthContext'
import { PageTransition, FadeIn } from '@/components/animations/PageTransition'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ROLE_LABELS } from '@/lib/roles'
import { getSettingsPathForRole } from '@/lib/navigation'
import { getEnrolledCourses } from '@/data/courses'
import {
  Award,
  BookOpen,
  Calendar,
  Edit3,
  Mail,
  MapPin,
  Trophy,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProfilePage() {
  const { user } = useAuth()
  const enrolled = getEnrolledCourses()

  if (!user) return null

  return (
    <PageTransition>
      <FadeIn>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Profile Card */}
          <Card className="w-full sm:w-80 shrink-0">
            <CardContent className="p-8 text-center">
              <Avatar className="mx-auto h-24 w-24">
                <AvatarFallback className="text-2xl">{user.avatar}</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-white/50">{user ? ROLE_LABELS[user.role] : ''}</p>
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

              <Link to={getSettingsPathForRole(user.role)}>
                <Button variant="outline" className="mt-6 w-full">
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Details */}
          <div className="flex-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">{user.bio}</p>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Courses Enrolled', value: enrolled.length, icon: BookOpen },
                { label: 'Certificates', value: 2, icon: Award },
                { label: 'Achievements', value: 8, icon: Trophy },
              ].map((stat) => (
                <Card key={stat.label}>
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

            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Node.js', 'UI Design', 'Figma', 'Python', 'AWS'].map(
                    (skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1">
                        {skill}
                      </Badge>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'Fast Learner', desc: 'Completed 5 lessons in one day', date: '2 days ago' },
                  { title: 'Course Champion', desc: 'Finished Full Stack Web Development', date: '1 week ago' },
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
                    {i < 2 && <Separator className="mt-4" />}
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
