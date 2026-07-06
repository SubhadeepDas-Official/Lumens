import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Edit, FileText, Search } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { TeacherPageHeader } from '@/components/teacher/TeacherUI'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { teacherCourses, type CourseStatus } from '@/data/teacherPortal'
import { formatIndianCount } from '@/lib/format'
import { cn } from '@/lib/utils'

const filters: (CourseStatus | 'all')[] = ['all', 'published', 'draft', 'archived']
const categories = ['All', 'Development', 'Design', 'Data Science', 'Marketing', 'Cloud']

export default function TeacherCoursesPage() {
  const [status, setStatus] = useState<(typeof filters)[number]>('all')
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = teacherCourses.filter((c) => {
    const matchStatus = status === 'all' || c.status === status
    const matchCategory = category === 'All' || c.category === category
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchCategory && matchSearch
  })

  return (
    <PageTransition>
      <TeacherPageHeader
        title="My Courses"
        description="Manage and monitor all your courses."
        action={
          <Link to="/teacher/courses/create">
            <Button variant="highlight">Create Course</Button>
          </Link>
        }
      />

      <div className="mb-6 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <Input placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button key={f} type="button" onClick={() => setStatus(f)}>
              <Badge variant={status === f ? 'default' : 'secondary'} className="cursor-pointer capitalize">
                {f}
              </Badge>
            </button>
          ))}
          <span className="mx-2 w-px bg-border/40" />
          {categories.map((cat) => (
            <button key={cat} type="button" onClick={() => setCategory(cat)}>
              <Badge variant={category === cat ? 'default' : 'secondary'} className="cursor-pointer">
                {cat}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course) => (
          <Card key={course.id} className="overflow-hidden rounded-[18px]">
            <div className="relative h-36">
              <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
              <div className={cn('absolute inset-0 bg-gradient-to-t from-bg-primary/90 to-transparent')} />
              <Badge className="absolute right-3 top-3 capitalize">{course.status}</Badge>
            </div>
            <CardContent className="p-4">
              <Badge variant="secondary" className="mb-2">{course.category}</Badge>
              <h3 className="font-semibold leading-snug">{course.title}</h3>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/50">
                <span>{formatIndianCount(course.students)} students</span>
                <span>★ {course.rating}</span>
                <span>Updated {course.lastUpdated}</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-white/50">
                  <span>Completion</span>
                  <span>{course.completionRate}%</span>
                </div>
                <Progress value={course.completionRate} className="mt-1 h-1.5" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to={`/teacher/courses/create?edit=${course.id}`}>
                  <Button size="sm" variant="outline"><Edit className="h-3.5 w-3.5" />Edit</Button>
                </Link>
                <Link to="/teacher/analytics">
                  <Button size="sm" variant="ghost"><BarChart3 className="h-3.5 w-3.5" />Analytics</Button>
                </Link>
                <Link to="/teacher/content">
                  <Button size="sm" variant="ghost"><FileText className="h-3.5 w-3.5" />Content</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageTransition>
  )
}
