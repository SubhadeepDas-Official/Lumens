import type { Course } from '@/data/courses'

const CATEGORY_COVERS: Record<string, string> = {
  Development:
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80',
  Design:
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=80',
  'Data Science':
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80',
  Marketing:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
  Cloud:
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
}

const INSTRUCTOR_PHOTOS: Record<string, string> = {
  'Dr. Sarah Chen':
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  'Marcus Rivera':
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
  'Prof. James Okonkwo':
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
  'Elena Vasquez':
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  'David Kim':
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
}

export function getCourseCoverImage(course: Pick<Course, 'coverImage' | 'category'>): string {
  return course.coverImage ?? CATEGORY_COVERS[course.category] ?? CATEGORY_COVERS.Development
}

export function getInstructorPhoto(instructor: string): string | undefined {
  return INSTRUCTOR_PHOTOS[instructor]
}

export const CATALOG_BANNER_IMAGE =
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80'

export const PROMO_BANNER_IMAGE =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80'
