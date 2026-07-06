import { useState } from 'react'
import { Eye, Pencil, Search, Trash2, UserX } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { AdminPageHeader } from '@/components/admin/AdminUI'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { adminStudents } from '@/data/adminPortal'

export default function AdminStudentsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all')

  const filtered = adminStudents.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <PageTransition>
      <AdminPageHeader title="Student Management" description="Search, view, and manage all enrolled students." />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'suspended'] as const).map((status) => (
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
      </div>

      <Card className="overflow-hidden rounded-[18px]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 text-left text-white/50">
                  <th className="px-5 py-3 font-medium">Student</th>
                  <th className="px-5 py-3 font-medium">Courses</th>
                  <th className="px-5 py-3 font-medium">Progress</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Joined</th>
                  <th className="px-5 py-3 font-medium">Last Active</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student) => (
                  <tr key={student.id} className="border-b border-border/20 hover:bg-bg-secondary/20">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={student.photo} alt={student.name} className="h-9 w-9 rounded-full object-cover" />
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-white/45">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-white/60">{student.enrolledCourses}</td>
                    <td className="px-5 py-4">
                      <div className="w-24">
                        <Progress value={student.progress} className="h-1.5" />
                        <span className="text-xs text-white/45">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={student.status === 'active' ? 'success' : 'warning'} className="capitalize">
                        {student.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-white/50">{student.joined}</td>
                    <td className="px-5 py-4 text-white/45">{student.lastActive}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="View details">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Suspend">
                          <UserX className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PageTransition>
  )
}
