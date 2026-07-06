import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  delay?: number
  trend?: string
  className?: string
}

export function StatCard({ label, value, icon: Icon, delay = 0, trend, className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card className={cn('overflow-hidden rounded-[18px]', className)}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-primary/20">
              <Icon className="h-5 w-5 text-highlight" />
            </div>
            {trend && <span className="text-xs text-green-400">{trend}</span>}
          </div>
          <p className="mt-4 text-2xl font-bold">{value}</p>
          <p className="mt-1 text-sm text-white/50">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
