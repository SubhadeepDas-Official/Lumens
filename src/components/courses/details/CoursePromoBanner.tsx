import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Course } from '@/data/courses'
import { PROMO_BANNER_IMAGE } from '@/lib/courseImages'
import { formatINR } from '@/lib/format'
import { Button } from '@/components/ui/button'

interface CoursePromoBannerProps {
  course: Course
  canLearn: boolean
}

export function CoursePromoBanner({ course, canLearn }: CoursePromoBannerProps) {
  if (canLearn) return null

  return (
    <section className="py-8">
      <div className="relative overflow-hidden rounded-[20px]">
        <img
          src={PROMO_BANNER_IMAGE}
          alt="Students collaborating"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/95 via-bg-primary/80 to-bg-primary/50" />
        <div className="relative flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-highlight">
              Limited cohort seats
            </p>
            <h3 className="mt-2 text-xl font-bold sm:text-2xl">
              Join {course.title} today
            </h3>
            <p className="mt-2 max-w-lg text-sm text-white/65">
              Get lifetime access, mentor reviews, and a verified certificate — starting at{' '}
              {formatINR(course.price)}.
            </p>
          </div>
          <Link to={`/catalog/${course.id}`}>
            <Button variant="highlight" className="shrink-0 rounded-full">
              Enroll now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
