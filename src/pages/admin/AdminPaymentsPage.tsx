import { PageTransition } from '@/components/animations/PageTransition'
import { AdminPageHeader, SimpleBarChart } from '@/components/admin/AdminUI'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { adminChartData, adminStats, adminTransactions, refundRequests } from '@/data/adminPortal'
import { formatINR } from '@/lib/format'

export default function AdminPaymentsPage() {
  return (
    <PageTransition>
      <AdminPageHeader title="Payments" description="Revenue summary, transactions, and refund management." />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <p className="text-2xl font-bold text-highlight">{formatINR(adminStats.totalRevenue)}</p>
            <p className="text-sm text-white/50">Total Revenue</p>
          </CardContent>
        </Card>
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <p className="text-2xl font-bold">{formatINR(2840000)}</p>
            <p className="text-sm text-white/50">Monthly Revenue</p>
          </CardContent>
        </Card>
        <Card className="rounded-[18px]">
          <CardContent className="p-5">
            <p className="text-2xl font-bold text-amber-400">{formatINR(15798)}</p>
            <p className="text-sm text-white/50">Pending Refunds</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 rounded-[18px]">
        <CardContent className="p-5">
          <h3 className="mb-4 font-semibold">Revenue Overview</h3>
          <SimpleBarChart data={adminChartData.revenue} labels={adminChartData.months} />
        </CardContent>
      </Card>

      <Tabs defaultValue="transactions">
        <TabsList className="mb-4">
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="refunds">Refund Requests</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card className="overflow-hidden rounded-[18px]">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30 text-left text-white/50">
                    <th className="px-5 py-3 font-medium">ID</th>
                    <th className="px-5 py-3 font-medium">Student</th>
                    <th className="px-5 py-3 font-medium">Course</th>
                    <th className="px-5 py-3 font-medium">Amount</th>
                    <th className="px-5 py-3 font-medium">Method</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {adminTransactions.map((txn) => (
                    <tr key={txn.id} className="border-b border-border/20 hover:bg-bg-secondary/20">
                      <td className="px-5 py-3 font-mono text-xs">{txn.id}</td>
                      <td className="px-5 py-3">{txn.student}</td>
                      <td className="px-5 py-3 text-white/60">{txn.course}</td>
                      <td className="px-5 py-3 font-medium">{formatINR(txn.amount)}</td>
                      <td className="px-5 py-3 text-white/50">{txn.method}</td>
                      <td className="px-5 py-3 text-white/50">{txn.date}</td>
                      <td className="px-5 py-3">
                        <Badge
                          variant={
                            txn.status === 'completed'
                              ? 'success'
                              : txn.status === 'pending'
                                ? 'warning'
                                : 'secondary'
                          }
                          className="capitalize"
                        >
                          {txn.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refunds">
          <Card className="overflow-hidden rounded-[18px]">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30 text-left text-white/50">
                    <th className="px-5 py-3 font-medium">ID</th>
                    <th className="px-5 py-3 font-medium">Student</th>
                    <th className="px-5 py-3 font-medium">Course</th>
                    <th className="px-5 py-3 font-medium">Amount</th>
                    <th className="px-5 py-3 font-medium">Reason</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {refundRequests.map((refund) => (
                    <tr key={refund.id} className="border-b border-border/20 hover:bg-bg-secondary/20">
                      <td className="px-5 py-3 font-mono text-xs">{refund.id}</td>
                      <td className="px-5 py-3">{refund.student}</td>
                      <td className="px-5 py-3 text-white/60">{refund.course}</td>
                      <td className="px-5 py-3 font-medium">{formatINR(refund.amount)}</td>
                      <td className="px-5 py-3 text-white/50">{refund.reason}</td>
                      <td className="px-5 py-3">
                        <Badge variant={refund.status === 'approved' ? 'success' : 'warning'} className="capitalize">
                          {refund.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3">
                        {refund.status === 'pending' && (
                          <div className="flex gap-1">
                            <Button variant="secondary" size="sm" className="rounded-full text-xs">
                              Approve
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-full text-xs text-red-400">
                              Reject
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="overflow-hidden rounded-[18px]">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30 text-left text-white/50">
                    <th className="px-5 py-3 font-medium">ID</th>
                    <th className="px-5 py-3 font-medium">Student</th>
                    <th className="px-5 py-3 font-medium">Course</th>
                    <th className="px-5 py-3 font-medium">Amount</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {adminTransactions.filter((t) => t.status === 'completed').map((txn) => (
                    <tr key={txn.id} className="border-b border-border/20">
                      <td className="px-5 py-3 font-mono text-xs">{txn.id}</td>
                      <td className="px-5 py-3">{txn.student}</td>
                      <td className="px-5 py-3 text-white/60">{txn.course}</td>
                      <td className="px-5 py-3 font-medium">{formatINR(txn.amount)}</td>
                      <td className="px-5 py-3 text-white/50">{txn.date}</td>
                      <td className="px-5 py-3">
                        <Badge variant="success">Completed</Badge>
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
