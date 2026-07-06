import { cn } from '@/lib/utils'

export function SectionLabel({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-block rounded-full border border-accent-secondary/40 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-highlight',
        className
      )}
    >
      {children}
    </span>
  )
}
