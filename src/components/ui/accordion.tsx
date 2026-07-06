import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItemProps {
  title: ReactNode
  subtitle?: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  className?: string
  chevronClassName?: string
}

export function AccordionItem({
  title,
  subtitle,
  children,
  defaultOpen = false,
  className,
  chevronClassName,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={cn('border-b border-border/20 last:border-b-0', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-4 text-left"
      >
        <div className="min-w-0 flex-1">
          {title}
          {subtitle}
        </div>
        <ChevronDown
          className={cn(
            'mt-1 h-5 w-5 shrink-0 transition-transform duration-200',
            chevronClassName ?? 'text-white/40',
            open && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-200',
          open ? 'grid-rows-[1fr] pb-4 opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
