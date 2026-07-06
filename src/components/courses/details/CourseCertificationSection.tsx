import { Award } from 'lucide-react'
import { certificationPoints } from '@/data/courseDetailsContent'
import type { Course } from '@/data/courses'
import { getCourseCoverImage } from '@/lib/courseImages'
import { SectionLabel } from './SectionLabel'

interface CourseCertificationSectionProps {
  course: Course
}

export function CourseCertificationSection({ course }: CourseCertificationSectionProps) {
  return (
    <section className="py-8">
      <div className="text-center">
        <SectionLabel>Certification</SectionLabel>
        <h2 className="mt-3 text-xl font-bold sm:text-2xl">
          Get Certified With Recognized Validation
        </h2>
      </div>

      <div className="mt-6 overflow-hidden rounded-[20px] border border-border/40 bg-bg-secondary/30">
        <div className="relative h-28 overflow-hidden border-b border-border/30 sm:h-32">
          <img
            src={getCourseCoverImage(course)}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/90 via-bg-primary/70 to-transparent" />
          <div className="absolute inset-0 flex items-center px-6">
            <p className="max-w-md text-sm text-white/75">
              Showcase your skills with a verified Lumen certificate recognized by hiring partners.
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2">
          <div className="border-b border-border/30 p-5 lg:border-b-0 lg:border-r lg:p-6">
            <h3 className="text-lg font-bold">
              Earn Certificate Of <span className="gradient-text">Completion</span>
            </h3>
            <ul className="mt-5 space-y-3">
              {certificationPoints.map((point, i) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-white/75">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-primary/25 text-[10px] font-bold text-highlight">
                    {i + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center bg-gradient-to-br from-accent-primary/20 to-bg-primary p-5 lg:p-6">
            <div className="w-full max-w-xs rotate-1 rounded-lg border border-white/20 bg-white p-5 text-bg-primary shadow-xl">
              <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-accent-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent-primary">
                    Lumen
                  </span>
                </div>
                <span className="text-[9px] text-bg-primary/50">Verified</span>
              </div>
              <p className="mt-4 text-center text-[9px] font-semibold uppercase tracking-[0.15em] text-bg-primary/50">
                Certificate Of Excellence
              </p>
              <p className="mt-1.5 text-center text-xs font-bold uppercase leading-snug text-accent-primary">
                {course.title}
              </p>
              <p className="mt-4 text-center text-[10px] text-bg-primary/50">Awarded to</p>
              <p className="text-center text-base font-bold">Your Name</p>
              <p className="mt-4 text-center text-[9px] text-bg-primary/40">
                Issued by Lumen Education · 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
