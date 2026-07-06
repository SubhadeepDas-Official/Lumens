import { cn } from '@/lib/utils'

interface SimpleBarChartProps {
  data: number[]
  labels: string[]
  className?: string
}

export function SimpleBarChart({ data, labels, className }: SimpleBarChartProps) {
  const max = Math.max(...data, 1)

  return (
    <div className={cn('flex h-32 items-end gap-2', className)}>
      {data.map((value, i) => (
        <div key={labels[i]} className="flex flex-1 flex-col items-center gap-2">
          <div
            className="w-full rounded-t-md bg-gradient-to-t from-accent-primary to-accent-secondary transition-all"
            style={{ height: `${(value / max) * 100}%`, minHeight: value > 0 ? '4px' : '0' }}
          />
          <span className="text-[10px] text-white/40">{labels[i]}</span>
        </div>
      ))}
    </div>
  )
}

interface StudentPageHeaderProps {
  title: React.ReactNode
  description?: string
  action?: React.ReactNode
}

export function StudentPageHeader({ title, description, action }: StudentPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-white/55">{description}</p>}
      </div>
      {action}
    </div>
  )
}
