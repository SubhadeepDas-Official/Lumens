import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Lock,
  Play,
  Star,
  Users,
} from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/context/AuthContext'
import { getCourseById } from '@/data/courses'
import { formatINR, formatIndianCount } from '@/lib/format'
import { CourseMedia } from '@/components/courses/CourseMedia'
import {
  CourseCertificationSection,
  CourseComparisonSection,
  CourseDetailsSidebar,
  CourseDetailsExtras,
  CourseFAQSection,
  CoursePartnerLogos,
  CoursePromoBanner,
  CourseQuickInfo,
  CourseStickyBar,
  CourseStructuredCurriculum,
  CourseTestimonialsSection,
} from '@/components/courses/details'

function EnrollButton({ courseId, price, className }: { courseId: string; price: number; className?: string }) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return (
      <Button variant="highlight" size="lg" className={className}>
        Enroll for {formatINR(price)}
      </Button>
    )
  }

  return (
    <Link
      to="/login"
      state={{ from: { pathname: `/catalog/${courseId}` }, action: 'enroll' }}
    >
      <Button variant="highlight" size="lg" className={className}>
        <Lock className="h-5 w-5" />
        Sign in to enroll — {formatINR(price)}
      </Button>
    </Link>
  )
}

export default function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { isAuthenticated } = useAuth()
  const course = getCourseById(id || '')

  if (!course) {
    return (
      <PageTransition>
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-bold">Course not found</h2>
          <Link to="/catalog" className="mt-4">
            <Button variant="outline">Back to Courses</Button>
          </Link>
        </div>
      </PageTransition>
    )
  }

  const canLearn = Boolean(isAuthenticated && course.enrolled)
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedLessons = course.modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  )
  const firstIncomplete = course.modules.flatMap((m) => m.lessons).find((l) => !l.completed)

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl divide-y divide-border/30 pb-24">
        <div className="pb-6">
          <Link
            to="/catalog"
            className="mb-4 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>

          <CourseMedia course={course} variant="hero" overlay="medium" className="rounded-[20px]">
            <div className="flex h-full flex-col justify-end p-6 sm:p-8">
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge>{course.level}</Badge>
                {course.enrolled && isAuthenticated && <Badge variant="success">Enrolled</Badge>}
              </div>
              <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{course.title}</h1>
              <p className="mt-2 max-w-2xl text-sm text-white/70">{course.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/60 sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-highlight text-highlight" />
                  {course.rating} rating
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  {formatIndianCount(course.students)} learners
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  {course.lessons} lessons
                </span>
              </div>

              {canLearn && course.progress !== undefined && (
                <div className="mt-4 max-w-sm">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">Your progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="mt-1.5" />
                  <p className="mt-1 text-[11px] text-white/50">
                    {completedLessons} of {totalLessons} lessons completed
                  </p>
                </div>
              )}

              <div className="mt-5">
                {canLearn ? (
                  <Link
                    to={`/courses/${course.id}/learn/${firstIncomplete?.id || course.modules[0].lessons[0].id}`}
                  >
                    <Button variant="highlight" size="lg">
                      <Play className="h-5 w-5" />
                      {course.progress ? 'Continue Learning' : 'Start Course'}
                    </Button>
                  </Link>
                ) : (
                  <EnrollButton courseId={course.id} price={course.price} />
                )}
              </div>
            </div>
          </CourseMedia>
        </div>

        <div className="grid gap-5 py-6 lg:grid-cols-[1fr_300px] lg:items-start lg:gap-6">
          <div className="flex flex-col gap-4">
            <CourseQuickInfo course={course} />
            <CourseDetailsExtras course={course} />
          </div>
          <CourseDetailsSidebar course={course} canLearn={canLearn} />
        </div>

        <CourseComparisonSection />
        <CourseStructuredCurriculum course={course} />
        <CoursePromoBanner course={course} canLearn={canLearn} />
        <CourseTestimonialsSection />
        <CourseCertificationSection course={course} />
        <CoursePartnerLogos />
        <CourseFAQSection />

        {!canLearn && <CourseStickyBar courseId={course.id} price={course.price} />}
      </div>
    </PageTransition>
  )
}
