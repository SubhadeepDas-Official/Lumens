import { Check, GraduationCap, Layers, X } from 'lucide-react'
import { lumenAdvantages, otherPrograms } from '@/data/courseDetailsContent'
import { SectionLabel } from './SectionLabel'

export function CourseComparisonSection() {
  return (
    <section className="py-8">
      <div className="text-center">
        <SectionLabel>Comparison</SectionLabel>
        <h2 className="mt-3 text-xl font-bold sm:text-2xl">
          What Sets Lumen Apart From Other Programs
        </h2>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[20px] border border-accent-secondary/30 bg-bg-secondary/40 p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-primary/30">
              <GraduationCap className="h-4 w-4 text-highlight" />
            </div>
            <span className="font-semibold">Lumen Education</span>
          </div>
          <ul className="space-y-3">
            {lumenAdvantages.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-white/80">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                  <Check className="h-2.5 w-2.5 text-green-400" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[20px] border border-border/40 bg-bg-secondary/20 p-5">
          <div className="mb-4 flex items-center gap-2.5 text-white/60">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5">
              <Layers className="h-4 w-4" />
            </div>
            <span className="font-semibold">Others</span>
          </div>
          <ul className="space-y-3">
            {otherPrograms.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-white/50">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500/15">
                  <X className="h-2.5 w-2.5 text-red-400" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
