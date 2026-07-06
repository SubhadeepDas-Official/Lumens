import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Clock,
  Flame,
  Target,
  TrendingUp,
  Trophy,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { PageTransition, FadeIn } from '@/components/animations/PageTransition'
import { LearningStreakBoard } from '@/components/dashboard/LearningStreakBoard'
import { CourseCard } from '@/components/courses/CourseCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getEnrolledCourses } from '@/data/courses'

export default function DashboardPage() {
  const { user } = useAuth()
  const enrolledCourses = getEnrolledCourses()
  const avgProgress = Math.round(
    enrolledCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / enrolledCourses.length
  )

  return (
    <PageTransition>
      <FadeIn>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, <span className="gradient-text">{user?.name.split(' ')[0]}</span>
            </h1>
            <p className="mt-1 text-white/60">Continue where you left off.</p>
          </div>
          <Link to="/catalog">
            <Button variant="outline" className="rounded-full">
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </FadeIn>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Courses Enrolled', value: enrolledCourses.length, icon: BookOpen, color: 'text-highlight' },
          { label: 'Avg. Progress', value: `${avgProgress}%`, icon: TrendingUp, color: 'text-accent-secondary' },
          { label: 'Learning Streak', value: '12 days', icon: Flame, color: 'text-orange-400' },
          { label: 'Certificates', value: '2', icon: Trophy, color: 'text-amber-400' },
        ].map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.08}>
            <Card className="overflow-hidden rounded-[20px]">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-bg-secondary">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white/50">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FadeIn delay={0.2}>
            <h2 className="mb-4 text-xl font-semibold">Continue Learning</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {enrolledCourses.slice(0, 2).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="flex flex-col gap-4">
          <FadeIn delay={0.3}>
            <Card className="overflow-hidden rounded-[20px]">
              <CardHeader className="p-5 pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-highlight" />
                  Weekly Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div className="text-center">
                  <div className="relative mx-auto h-32 w-32">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="rgba(39,77,96,0.4)"
                        strokeWidth="8"
                        className="rounded-full"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="url(#weekly-goal-gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={264}
                        initial={{ strokeDashoffset: 264 }}
                        animate={{ strokeDashoffset: 264 - (264 * 75) / 100 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                      />
                      <defs>
                        <linearGradient id="weekly-goal-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#0A7075" />
                          <stop offset="100%" stopColor="#6BA3BE" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">75%</span>
                      <span className="text-xs text-white/50">of goal</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-white/60">3 of 4 hours completed this week</p>
                  <div className="mt-3 flex items-center justify-center gap-2 rounded-full bg-bg-secondary/40 px-3 py-1.5 text-xs text-white/40">
                    <Clock className="h-3.5 w-3.5" />
                    1 hour remaining
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.35}>
            <LearningStreakBoard userId={user?.uid} />
          </FadeIn>
        </div>
      </div>

      <FadeIn delay={0.4} className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
        <Card className="overflow-hidden rounded-[20px]">
          <CardContent className="space-y-2 p-3">
            {[
              { action: 'Completed lesson', detail: 'State & Hooks', course: 'Full Stack Web Development', time: '2 hours ago' },
              { action: 'Started lesson', detail: 'Color Theory', course: 'UI/UX Design Masterclass', time: 'Yesterday' },
              { action: 'Earned certificate', detail: 'HTML & CSS Fundamentals', course: 'Web Basics', time: '3 days ago' },
            ].map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center justify-between rounded-2xl border border-border/20 bg-bg-secondary/20 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">
                    {activity.action}: {activity.detail}
                  </p>
                  <p className="text-xs text-white/50">{activity.course}</p>
                </div>
                <span className="rounded-full bg-bg-secondary/50 px-2.5 py-1 text-xs text-white/40">
                  {activity.time}
                </span>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </FadeIn>
    </PageTransition>
  )
}
