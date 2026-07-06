import { useState } from 'react'
import { BarChart3, Check, Clock } from 'lucide-react'
import { AccordionItem } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Course } from '@/data/courses'
import {
  curriculumHighlights,
  getCoursePrerequisites,
  getDurationWeeks,
  getModuleDescription,
} from '@/data/courseDetailsContent'
import { SectionLabel } from './SectionLabel'

const VISIBLE_MODULES = 3

interface CourseStructuredCurriculumProps {
  course: Course
}

export function CourseStructuredCurriculum({ course }: CourseStructuredCurriculumProps) {
  const [showAll, setShowAll] = useState(false)
  const visibleModules = showAll ? course.modules : course.modules.slice(0, VISIBLE_MODULES)
  const hiddenCount = Math.max(0, course.modules.length - VISIBLE_MODULES)

  return (
    <section className="py-8">
      <div className="overflow-hidden rounded-[20px] bg-[#e8f2f3] text-bg-primary">
        <div className="border-b border-black/5 px-5 py-6 text-center sm:px-8">
          <SectionLabel className="border-accent-primary/30 text-accent-primary">
            Curriculum
          </SectionLabel>
          <h2 className="mt-3 text-xl font-bold text-bg-primary sm:text-2xl">
            Structured Curriculum Designed For Real Growth
          </h2>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr]">
          <div className="border-b border-black/5 bg-bg-primary p-5 text-white lg:border-b-0 lg:border-r">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
              Course Prerequisites
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-white/80">
              {getCoursePrerequisites(course)}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="gap-1 text-[11px]">
                <BarChart3 className="h-3 w-3" />
                {course.level}
              </Badge>
              <Badge variant="secondary" className="gap-1 text-[11px]">
                <Clock className="h-3 w-3" />
                {getDurationWeeks(course)}
              </Badge>
            </div>

            <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-white/50">
              Quick Overview
            </p>
            <ul className="mt-2 space-y-2">
              {curriculumHighlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-white/75">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-highlight" />
                  {item}
                </li>
              ))}
            </ul>

            <Button variant="highlight" size="sm" className="mt-4 w-full rounded-full">
              View Full Syllabus →
            </Button>
          </div>

          <div className="divide-y divide-black/5">
            {visibleModules.map((module, index) => (
              <div key={module.id} className="bg-white px-5">
                <AccordionItem
                  defaultOpen={index === 0}
                  chevronClassName="text-bg-primary/40"
                  title={
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-accent-primary">
                        Module {index + 1}
                      </p>
                      <p className="text-sm font-semibold text-bg-primary">{module.title}</p>
                    </div>
                  }
                  subtitle={
                    <p className="mt-0.5 text-xs text-bg-primary/55">
                      {getModuleDescription(module.title, course.title)}
                    </p>
                  }
                >
                  <ul className="space-y-1.5 border-t border-black/5 pt-2">
                    {module.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex items-center justify-between text-xs text-bg-primary/70"
                      >
                        <span>{lesson.title}</span>
                        <span className="text-bg-primary/45">{lesson.duration}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              </div>
            ))}

            {!showAll && hiddenCount > 0 && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="w-full bg-white py-3 text-sm font-medium text-accent-primary transition-colors hover:bg-accent-primary/5"
              >
                {hiddenCount} More →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
