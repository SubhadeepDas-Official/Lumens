import { Link } from 'react-router-dom'
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  Lock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/context/AuthContext'
import type { Course } from '@/data/courses'
import { courseIncludes } from '@/data/courseDetailsContent'
import { getInstructorPhoto } from '@/lib/courseImages'
import { formatINR } from '@/lib/format'

interface CourseDetailsSidebarProps {
  course: Course
  canLearn: boolean
}

function EnrollButton({ courseId, price, className }: { courseId: string; price: number; className?: string }) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return (
      <Button variant="highlight" className={className}>
        Enroll for {formatINR(price)}
      </Button>
    )
  }

  return (
    <Link
      to="/login"
      state={{ from: { pathname: `/catalog/${courseId}` }, action: 'enroll' }}
    >
      <Button variant="highlight" className={className}>
        <Lock className="h-4 w-4" />
        Sign in to enroll — {formatINR(price)}
      </Button>
    </Link>
  )
}

export function CourseDetailsSidebar({ course, canLearn }: CourseDetailsSidebarProps) {
  const { isAuthenticated } = useAuth()
  const moduleCount = course.modules.length
  const instructorPhoto = getInstructorPhoto(course.instructor)

  return (
    <Card className="overflow-hidden lg:sticky lg:top-24">
      <CardContent className="p-0">
        <div className="p-5">
          <h3 className="text-sm font-semibold">Instructor</h3>
          <div className="mt-3 flex items-center gap-3">
            {instructorPhoto ? (
              <img
                src={instructorPhoto}
                alt={course.instructor}
                className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-accent-primary/30"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary/30 text-xs font-medium text-highlight">
                {course.instructorAvatar}
              </div>
            )}
            <div>
              <p className="text-sm font-medium">{course.instructor}</p>
              <p className="text-xs text-white/50">Senior Instructor</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="p-5">
          <h3 className="text-sm font-semibold">Course Overview</h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              { icon: Layers, label: 'Modules', value: String(moduleCount) },
              { icon: BookOpen, label: 'Lessons', value: String(course.lessons) },
              { icon: Clock, label: 'Duration', value: course.duration },
              { icon: BarChart3, label: 'Level', value: course.level },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[12px] border border-border/30 bg-bg-secondary/30 px-2.5 py-2"
              >
                <div className="flex items-center gap-1 text-white/45">
                  <stat.icon className="h-3 w-3" />
                  <span className="text-[10px]">{stat.label}</span>
                </div>
                <p className="mt-0.5 text-xs font-medium">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="p-5">
          <h3 className="text-sm font-semibold">Tags</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {course.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div className="p-5">
          <h3 className="text-sm font-semibold">This Course Includes</h3>
          <ul className="mt-2 space-y-1.5">
            {courseIncludes.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between text-xs text-white/65"
              >
                <span>{item.label}</span>
                <span className="text-white/40">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {!canLearn && (
          <>
            <Separator />
            <div className="p-5 text-center">
              <p className="text-2xl font-bold text-highlight">{formatINR(course.price)}</p>
              <p className="mt-0.5 text-xs text-white/50">One-time payment · GST inclusive</p>
              <ul className="mt-3 space-y-1.5 text-left text-xs text-white/60">
                {['Lifetime access', 'Certificate of completion', 'Downloadable resources'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent-secondary" />
                      {item}
                    </li>
                  )
                )}
              </ul>
              <div className="mt-4">
                <EnrollButton courseId={course.id} price={course.price} className="w-full" />
              </div>
              {!isAuthenticated && (
                <p className="mt-2 text-[11px] text-white/40">
                  New here?{' '}
                  <Link to="/signup" className="text-highlight hover:underline">
                    Create a free account
                  </Link>
                </p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
