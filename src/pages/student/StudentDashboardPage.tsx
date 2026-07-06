import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Award, BookOpen, Clock, Flame, Play, Target, Trophy, Video } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { LearningStreakBoard } from '@/components/dashboard/LearningStreakBoard'
import { StatCard } from '@/components/teacher/StatCard'
import { StudentPageHeader, SimpleBarChart } from '@/components/student/StudentUI'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/context/AuthContext'
import {
  getEnrolledCoursesWithMeta,
  studentActivities,
  studentAnnouncements,
  studentLiveClasses,
  studentStats,
  weeklyProgress,
} from '@/data/studentPortal'

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function StudentDashboardPage() {
  const { user } = useAuth()
  const firstName = user?.name.split(' ')[0] ?? 'Learner'
  const enrolledCourses = getEnrolledCoursesWithMeta()
  const avgProgress = Math.round(
    enrolledCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / enrolledCourses.length
  )
  const upcomingClasses = studentLiveClasses.filter((c) => c.status === 'upcoming').slice(0, 2)
  const weeklyPercent = Math.round(
    (studentStats.weeklyCompletedHours / studentStats.weeklyGoalHours) * 100
  )

  return (
    <PageTransition>
      <StudentPageHeader
        title={
          <>
            Welcome back, <span className="gradient-text">{firstName}</span>
          </>
        }
        description="Continue your learning journey where you left off."
        action={
          <Link to="/catalog">
            <Button variant="outline" className="rounded-full">
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        }
      />

      <Card className="mb-6 overflow-hidden rounded-[18px] border-accent-primary/20 bg-gradient-to-r from-accent-primary/10 to-transparent">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-white/50">Overall Learning Progress</p>
            <p className="mt-1 text-3xl font-bold">{avgProgress}%</p>
            <p className="mt-1 text-sm text-white/55">
              {enrolledCourses.length} courses in progress · {studentStats.hoursLearned} hours learned
            </p>
          </div>
          <div className="w-full sm:w-64">
            <Progress value={avgProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Purchased Courses" value={String(studentStats.purchasedCourses)} icon={BookOpen} delay={0} />
        <StatCard label="Completed Courses" value={String(studentStats.completedCourses)} icon={Trophy} delay={0.05} />
        <StatCard label="Hours Learned" value={String(studentStats.hoursLearned)} icon={Clock} delay={0.1} trend="+4h this week" />
        <StatCard label="Certificates Earned" value={String(studentStats.certificatesEarned)} icon={Award} delay={0.15} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Continue Learning</h2>
              <Link to="/student/courses" className="text-xs text-highlight hover:underline">
                View all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {enrolledCourses.slice(0, 2).map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="overflow-hidden rounded-[18px]">
                    <div className="relative aspect-video">
                      <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-sm font-semibold">{course.title}</p>
                        <Progress value={course.progress} className="mt-2 h-1" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-white/50">Last watched: {course.lastLesson.title}</p>
                      <Link to={`/student/courses/${course.id}/learn/${course.lastLesson.id}`}>
                        <Button className="mt-3 w-full" size="sm">
                          <Play className="h-4 w-4" />
                          Continue
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <Card className="rounded-[18px]">
            <CardContent className="p-5">
              <h3 className="mb-4 font-semibold">Recent Activity</h3>
              <div className="space-y-2">
                {studentActivities.slice(0, 4).map((activity, i) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between rounded-[12px] border border-border/20 bg-bg-secondary/20 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {activity.action}: {activity.detail}
                      </p>
                      <p className="text-xs text-white/50">{activity.course}</p>
                    </div>
                    <span className="text-xs text-white/40">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="overflow-hidden rounded-[18px]">
            <CardHeader className="p-5 pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-highlight" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="text-center">
                <div className="relative mx-auto h-28 w-28">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(39,77,96,0.4)" strokeWidth="8" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="url(#student-weekly-gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={264}
                      initial={{ strokeDashoffset: 264 }}
                      animate={{ strokeDashoffset: 264 - (264 * weeklyPercent) / 100 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                    <defs>
                      <linearGradient id="student-weekly-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0A7075" />
                        <stop offset="100%" stopColor="#6BA3BE" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold">{weeklyPercent}%</span>
                    <span className="text-[10px] text-white/50">of goal</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/60">
                  {studentStats.weeklyCompletedHours} of {studentStats.weeklyGoalHours} hours this week
                </p>
              </div>
              <div className="mt-4">
                <SimpleBarChart data={weeklyProgress} labels={dayLabels} />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[18px]">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-400" />
                <span className="font-semibold">{studentStats.learningStreak} day streak</span>
              </div>
              <p className="text-sm text-white/50">Keep it up! Learn today to maintain your streak.</p>
            </CardContent>
          </Card>

          <LearningStreakBoard userId={user?.uid} />

          <Card className="rounded-[18px]">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Video className="h-4 w-4 text-highlight" />
                  Upcoming Live Classes
                </h3>
                <Link to="/student/live-classes" className="text-xs text-highlight hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {upcomingClasses.map((cls) => (
                  <div key={cls.id} className="rounded-[12px] bg-bg-secondary/30 p-3">
                    <p className="text-sm font-medium">{cls.title}</p>
                    <p className="text-xs text-white/50">{cls.course}</p>
                    <p className="mt-1 text-xs text-white/40">
                      {cls.date} · {cls.time}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[18px]">
            <CardContent className="p-5">
              <h3 className="mb-3 font-semibold">Recent Announcements</h3>
              <div className="space-y-3">
                {studentAnnouncements.slice(0, 2).map((a) => (
                  <div key={a.id} className="rounded-[12px] border border-border/20 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium">{a.title}</p>
                      {a.unread && <Badge className="shrink-0 text-[10px]">New</Badge>}
                    </div>
                    <p className="mt-1 text-xs text-white/50">{a.course}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}
