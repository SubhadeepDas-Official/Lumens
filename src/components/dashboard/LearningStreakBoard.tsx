import { useMemo } from 'react'
import { CalendarDays } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const WEEKS = 52
const DAYS = 7

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const LEVEL_CLASSES = [
  'bg-bg-secondary/80',
  'bg-accent-primary/35',
  'bg-accent-primary/55',
  'bg-accent-secondary/75',
  'bg-accent-secondary',
]

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function generateYearGrid(seed: string): number[][] {
  const grid: number[][] = Array.from({ length: DAYS }, () => Array(WEEKS).fill(0))
  let state = hashString(seed || 'lumen')

  for (let week = 0; week < WEEKS; week++) {
    for (let day = 0; day < DAYS; day++) {
      state = (state * 1664525 + 1013904223) % 4294967296
      const roll = state % 100
      if (roll < 38) grid[day][week] = 0
      else if (roll < 62) grid[day][week] = 1
      else if (roll < 80) grid[day][week] = 2
      else if (roll < 92) grid[day][week] = 3
      else grid[day][week] = 4
    }
  }

  return grid
}

function countActiveDays(grid: number[][]): number {
  return grid.reduce((acc, row) => acc + row.filter((level) => level > 0).length, 0)
}

interface LearningStreakBoardProps {
  userId?: string
}

export function LearningStreakBoard({ userId }: LearningStreakBoardProps) {
  const grid = useMemo(() => generateYearGrid(userId ?? 'guest'), [userId])
  const activeDays = useMemo(() => countActiveDays(grid), [grid])

  return (
    <Card className="overflow-hidden rounded-[20px]">
      <CardHeader className="space-y-1 p-4 pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <CalendarDays className="h-4 w-4 text-highlight" />
          Learning Activity
        </CardTitle>
        <p className="text-xs text-white/50">
          <span className="font-medium text-white/70">{activeDays}</span> days learned this year
        </p>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="mb-2 grid grid-cols-12 text-[9px] text-white/35">
          {MONTH_LABELS.map((month) => (
            <span key={month} className="truncate">
              {month}
            </span>
          ))}
        </div>

        <div
          className="grid w-full gap-[3px]"
          style={{
            gridTemplateRows: `repeat(${DAYS}, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))`,
          }}
        >
          {grid.flatMap((row, day) =>
            row.map((level, week) => (
              <div
                key={`${day}-${week}`}
                title={`${level > 0 ? `${level * 25} min` : 'No activity'}`}
                className={cn('aspect-square w-full rounded-[3px]', LEVEL_CLASSES[level])}
              />
            ))
          )}
        </div>

        <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-white/40">
          <span>Less</span>
          {LEVEL_CLASSES.map((levelClass) => (
            <div key={levelClass} className={cn('h-2.5 w-2.5 rounded-[2px]', levelClass)} />
          ))}
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  )
}
