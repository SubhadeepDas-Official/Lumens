export function AuthDivider({ label = 'or' }: { label?: string }) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border/40" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-bg-primary px-3 text-white/40">{label}</span>
      </div>
    </div>
  )
}
