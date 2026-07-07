import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface PhoneInputProps {
  id?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  className?: string
}

export function PhoneInput({
  id = 'phone',
  value,
  onChange,
  placeholder = '9876543210',
  required,
  className,
}: PhoneInputProps) {
  return (
    <div className={cn('flex gap-2', className)}>
      <div className="flex h-11 shrink-0 items-center rounded-[16px] border border-border/50 bg-bg-secondary/50 px-3 text-sm text-white/70">
        +91
      </div>
      <Input
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
        required={required}
        maxLength={10}
        className="flex-1"
      />
    </div>
  )
}
