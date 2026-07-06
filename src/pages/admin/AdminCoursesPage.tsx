import { useState } from 'react'
import { BarChart3, Eye, Pencil, Plus, Search, Trash2, UserPlus } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { AdminPageHeader } from '@/components/admin/AdminUI'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { adminCourses } from '@/data/adminPortal'
import { formatINR } from '@/lib/format'

export default function AdminCoursesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const categories = ['all', ...new Set(adminCourses.map((c) => c.category))]

  const filtered = adminCourses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <PageTransition>
      <AdminPageHeader
        title="Course Management"
        description="Create, edit, and manage all platform courses."
        action={
          <Button variant="highlight">
            <Plus className="h-4 w-4" />
            Create Course
          </Button>
        }
      />

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'published', 'draft', 'archived'] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'secondary'}
              size="sm"
              className="rounded-full capitalize"
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-9 rounded-full border border-border/50 bg-bg-secondary/50 px-4 text-xs"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course) => (
          <Card key={course.id} className="overflow-hidden rounded-[18px]">
            <div className="relative aspect-video">
              <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
              <Badge
                variant={course.status === 'published' ? 'success' : course.status === 'draft' ? 'warning' : 'secondary'}
                className="absolute right-3 top-3 capitalize"
              >
                {course.status}
              </Badge>
            </div>
            <CardContent className="p-4">
              <p className="text-xs text-highlight">{course.category}</p>
              <h3 className="mt-1 font-semibold leading-snug">{course.title}</h3>
              <p className="mt-1 text-xs text-white/50">by {course.teacher}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-white/50">
                <span>{course.students.toLocaleString('en-IN')} students</span>
                <span>{course.rating}★</span>
                <span>{formatINR(course.revenue)}</span>
              </div>
              <p className="mt-2 text-[11px] text-white/40">Updated {course.lastUpdated}</p>
              <div className="mt-4 flex flex-wrap gap-1">
                <Button variant="secondary" size="sm" className="rounded-full">
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button variant="secondary" size="sm" className="rounded-full">
                  <BarChart3 className="h-3.5 w-3.5" />
                  Analytics
                </Button>
                <Button variant="secondary" size="sm" className="rounded-full">
                  <UserPlus className="h-3.5 w-3.5" />
                  Assign
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Eye className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full text-red-400">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageTransition>
  )
}
