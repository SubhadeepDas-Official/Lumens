import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Search } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { StudentPageHeader } from '@/components/student/StudentUI'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { getEnrolledCoursesWithMeta } from '@/data/studentPortal'

export default function StudentCoursesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const courses = getEnrolledCoursesWithMeta()

  const categories = ['all', ...new Set(courses.map((c) => c.category))]

  const filtered = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || c.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <PageTransition>
      <StudentPageHeader
        title="My Courses"
        description={`${courses.length} enrolled courses`}
      />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <Input
            placeholder="Search courses or instructor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-11 rounded-[16px] border border-border/50 bg-bg-secondary/50 px-4 text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <Card key={course.id} className="group overflow-hidden rounded-[18px] transition-all hover:shadow-glow-accent">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3">
                <Badge variant="secondary">{course.category}</Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <Progress value={course.progress} className="h-1.5" />
                <p className="mt-1.5 text-xs text-white/70">{course.progress}% complete</p>
              </div>
            </div>
            <CardContent className="p-5">
              <h3 className="font-semibold leading-snug group-hover:text-highlight">{course.title}</h3>
              <p className="mt-1 text-sm text-white/50">{course.instructor}</p>
              <p className="mt-2 text-xs text-white/40">Last watched: {course.lastLesson.title}</p>
              <div className="mt-4 flex gap-2">
                <Link to={`/student/courses/${course.id}/learn/${course.lastLesson.id}`} className="flex-1">
                  <Button className="w-full" size="sm">
                    <Play className="h-4 w-4" />
                    Continue
                  </Button>
                </Link>
                <Link to={`/student/courses/${course.id}`}>
                  <Button variant="secondary" size="sm">
                    Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageTransition>
  )
}
