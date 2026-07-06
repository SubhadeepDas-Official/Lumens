import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-[16px] border border-border/50 bg-bg-secondary/50 px-4 py-2 text-sm text-white placeholder:text-white/40 transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary/40 focus-visible:border-accent-secondary/50',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
