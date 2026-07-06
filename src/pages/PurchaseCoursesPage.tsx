import { useState } from 'react'
import { PageTransition, FadeIn } from '@/components/animations/PageTransition'
import { CourseCard } from '@/components/courses/CourseCard'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'
import { CATALOG_BANNER_IMAGE } from '@/lib/courseImages'
import { courses } from '@/data/courses'

const categories = ['All', 'Development', 'Design', 'Data Science', 'Marketing', 'Cloud']

export default function PurchaseCoursesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || c.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="relative mb-8 overflow-hidden rounded-[20px]">
            <img
              src={CATALOG_BANNER_IMAGE}
              alt="Students learning together"
              className="h-44 w-full object-cover sm:h-52"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/95 via-bg-primary/75 to-bg-primary/40" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-highlight">
                Explore courses
              </p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Find your next skill</h1>
              <p className="mt-2 max-w-lg text-sm text-white/65">
                Industry-ready programs in development, design, data, marketing, and cloud.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)}>
                <Badge
                  variant={category === cat ? 'default' : 'secondary'}
                  className="cursor-pointer px-4 py-1.5 text-sm transition-all hover:opacity-80"
                >
                  {cat}
                </Badge>
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-8">
          <p className="mb-6 text-sm text-white/50">
            {filtered.length} course{filtered.length !== 1 ? 's' : ''} found
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} variant="catalog" />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-[20px] border border-border/30 py-16">
              <p className="text-white/50">No courses match your search.</p>
            </div>
          )}
        </FadeIn>
      </div>
    </PageTransition>
  )
}
