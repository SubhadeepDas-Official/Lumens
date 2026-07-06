import { PageTransition } from '@/components/animations/PageTransition'
import { SimpleBarChart, TeacherPageHeader } from '@/components/teacher/TeacherUI'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { chartData, teacherStats, transactions } from '@/data/teacherPortal'
import { formatINR } from '@/lib/format'

export default function EarningsPage() {
  return (
    <PageTransition>
      <TeacherPageHeader title="Earnings" description="Track your revenue and payouts." />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="rounded-[18px]"><CardContent className="p-5"><p className="text-2xl font-bold text-highlight">{formatINR(teacherStats.totalRevenue)}</p><p className="text-sm text-white/50">Total Earnings</p></CardContent></Card>
        <Card className="rounded-[18px]"><CardContent className="p-5"><p className="text-2xl font-bold">{formatINR(184000)}</p><p className="text-sm text-white/50">Monthly Revenue</p></CardContent></Card>
        <Card className="rounded-[18px]"><CardContent className="p-5"><p className="text-2xl font-bold text-amber-400">{formatINR(6699)}</p><p className="text-sm text-white/50">Pending Payouts</p></CardContent></Card>
      </div>

      <Card className="mb-6 rounded-[18px]">
        <CardContent className="p-5">
          <h3 className="mb-4 font-semibold">Revenue Chart</h3>
          <SimpleBarChart data={chartData.revenue.map((r) => r / 1000)} labels={chartData.months} />
        </CardContent>
      </Card>

      <Card className="rounded-[18px]">
        <CardContent className="p-0">
          <div className="border-b border-border/30 px-5 py-4">
            <h3 className="font-semibold">Transaction History</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 text-left text-white/50">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Course</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-border/20">
                  <td className="px-5 py-3 font-mono text-xs">{t.id}</td>
                  <td className="px-5 py-3">{t.course}</td>
                  <td className="px-5 py-3 font-medium">{formatINR(t.amount)}</td>
                  <td className="px-5 py-3 text-white/50">{t.date}</td>
                  <td className="px-5 py-3">
                    <Badge variant={t.status === 'completed' ? 'success' : 'warning'} className="capitalize">{t.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </PageTransition>
  )
}
