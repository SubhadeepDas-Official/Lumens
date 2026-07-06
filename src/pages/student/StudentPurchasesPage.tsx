import { Download } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { StudentPageHeader } from '@/components/student/StudentUI'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getEnrolledCoursesWithMeta, studentPurchases } from '@/data/studentPortal'
import { formatINR } from '@/lib/format'

export default function StudentPurchasesPage() {
  const enrolled = getEnrolledCoursesWithMeta()
  const totalSpent = studentPurchases.reduce((s, p) => s + p.amount, 0)

  return (
    <PageTransition>
      <StudentPageHeader
        title="Purchases"
        description="Your course purchases and payment history."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <p className="text-2xl font-bold text-highlight">{formatINR(totalSpent)}</p>
            <p className="text-sm text-white/50">Total Spent</p>
          </CardContent>
        </Card>
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <p className="text-2xl font-bold">{enrolled.length}</p>
            <p className="text-sm text-white/50">Courses Owned</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses">
        <TabsList className="mb-4">
          <TabsTrigger value="courses">Purchased Courses</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enrolled.map((course) => (
              <Card key={course.id} className="overflow-hidden rounded-[18px]">
                <div className="aspect-video">
                  <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold">{course.title}</h4>
                  <p className="text-sm text-white/50">{course.instructor}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="overflow-hidden rounded-[18px]">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30 text-left text-white/50">
                    <th className="px-5 py-3 font-medium">Order ID</th>
                    <th className="px-5 py-3 font-medium">Course</th>
                    <th className="px-5 py-3 font-medium">Amount</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Method</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {studentPurchases.map((purchase) => (
                    <tr key={purchase.id} className="border-b border-border/20 hover:bg-bg-secondary/20">
                      <td className="px-5 py-4 font-mono text-xs">{purchase.id}</td>
                      <td className="px-5 py-4">{purchase.courseTitle}</td>
                      <td className="px-5 py-4 font-medium">{formatINR(purchase.amount)}</td>
                      <td className="px-5 py-4 text-white/50">{purchase.date}</td>
                      <td className="px-5 py-4 text-white/50">{purchase.method}</td>
                      <td className="px-5 py-4">
                        <Badge variant="success" className="capitalize">
                          {purchase.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTransition>
  )
}
