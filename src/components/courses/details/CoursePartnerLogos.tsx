import { partnerLogos } from '@/data/courseDetailsContent'

const marqueeLogos = [...partnerLogos, ...partnerLogos]

export function CoursePartnerLogos() {
  return (
    <section className="py-8">
      <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-widest text-white/40">
        Trusted by professionals at
      </p>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg-primary to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg-primary to-transparent sm:w-16" />

        <div className="flex w-max animate-partner-marquee items-center gap-12 px-6">
          {marqueeLogos.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="shrink-0 text-base font-semibold tracking-wide text-white/25"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
