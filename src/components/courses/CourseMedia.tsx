import type { ReactNode } from 'react'
import type { Course } from '@/data/courses'
import { getCourseCoverImage } from '@/lib/courseImages'
import { cn } from '@/lib/utils'

interface CourseMediaProps {
  course: Pick<Course, 'title' | 'coverImage' | 'category' | 'image'>
  variant?: 'hero' | 'card' | 'thumbnail' | 'banner' | 'video'
  className?: string
  children?: ReactNode
  overlay?: 'heavy' | 'medium' | 'light'
}

const variantHeights = {
  hero: 'min-h-[300px] sm:min-h-[340px]',
  card: 'h-40',
  thumbnail: 'h-28',
  banner: 'h-44 sm:h-52',
  video: 'aspect-video',
}

const overlayStyles = {
  heavy: 'from-bg-primary via-bg-primary/75 to-bg-primary/30',
  medium: 'from-bg-primary via-bg-primary/60 to-transparent',
  light: 'from-bg-primary/90 via-bg-primary/40 to-transparent',
}

export function CourseMedia({
  course,
  variant = 'card',
  className,
  children,
  overlay = 'medium',
}: CourseMediaProps) {
  const src = getCourseCoverImage(course)

  return (
    <div className={cn('relative overflow-hidden', variantHeights[variant], className)}>
      <img
        src={src}
        alt={course.title}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-50', course.image)} />
      <div className={cn('absolute inset-0 bg-gradient-to-t', overlayStyles[overlay])} />
      {children ? <div className="relative h-full">{children}</div> : null}
    </div>
  )
}
