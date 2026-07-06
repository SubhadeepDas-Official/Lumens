import { useState } from 'react'
import { Check, Eye, Search, UserPlus, X } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { AdminPageHeader } from '@/components/admin/AdminUI'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { adminTeachers } from '@/data/adminPortal'

export default function AdminTeachersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all')

  const filtered = adminTeachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.expertise.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const pendingCount = adminTeachers.filter((t) => t.status === 'pending').length

  return (
    <PageTransition>
      <AdminPageHeader
        title="Teacher Management"
        description={`${pendingCount} teacher${pendingCount !== 1 ? 's' : ''} awaiting approval.`}
      />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <Input
            placeholder="Search teachers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'approved', 'pending', 'rejected'] as const).map((status) => (
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
                  <th className="px-5 py-3 font-medium">Teacher</th>
                  <th className="px-5 py-3 font-medium">Expertise</th>
                  <th className="px-5 py-3 font-medium">Courses</th>
                  <th className="px-5 py-3 font-medium">Students</th>
                  <th className="px-5 py-3 font-medium">Rating</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((teacher) => (
                  <tr key={teacher.id} className="border-b border-border/20 hover:bg-bg-secondary/20">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={teacher.photo} alt={teacher.name} className="h-9 w-9 rounded-full object-cover" />
                        <div>
                          <p className="font-medium">{teacher.name}</p>
                          <p className="text-xs text-white/45">{teacher.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-white/60">{teacher.expertise}</td>
                    <td className="px-5 py-4 text-white/60">{teacher.courses}</td>
                    <td className="px-5 py-4 text-white/60">{teacher.students.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-4">
                      {teacher.rating > 0 ? (
                        <span className="text-highlight">{teacher.rating}★</span>
                      ) : (
                        <span className="text-white/40">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          teacher.status === 'approved'
                            ? 'success'
                            : teacher.status === 'pending'
                              ? 'warning'
                              : 'secondary'
                        }
                        className="capitalize"
                      >
                        {teacher.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="View profile">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {teacher.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400" title="Approve">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400" title="Reject">
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Assign courses">
                          <UserPlus className="h-4 w-4" />
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
