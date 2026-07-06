import {
  Award,
  FolderKanban,
  MessageCircle,
  MonitorPlay,
  Route,
  Users,
} from 'lucide-react'
import { CourseMedia } from '@/components/courses/CourseMedia'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Course } from '@/data/courses'
import { getCourseCoverImage } from '@/lib/courseImages'
import { cn } from '@/lib/utils'

interface CourseDetailsExtrasProps {
  course: Course
}

const highlights = [
  {
    icon: FolderKanban,
    title: 'Real Projects',
    description: 'Build work you can showcase in interviews',
  },
  {
    icon: MessageCircle,
    title: 'Mentor Support',
    description: 'Get feedback from industry practitioners',
  },
  {
    icon: Users,
    title: 'Live Community',
    description: 'Collaborate with peers in Discord cohorts',
  },
  {
    icon: Award,
    title: 'Certificate',
    description: 'Earn verified proof of completion',
  },
]

export function CourseDetailsExtras({ course }: CourseDetailsExtrasProps) {
  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="p-5">
            <div className="flex items-center gap-2">
              <Route className="h-4 w-4 text-highlight" />
              <h3 className="text-sm font-semibold">Your Learning Path</h3>
            </div>
            <div className="mt-4 space-y-0">
              {course.modules.map((module, index) => (
                <div key={module.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-primary/25 text-xs font-semibold text-highlight">
                      {index + 1}
                    </div>
                    {index < course.modules.length - 1 && (
                      <div className="my-1 w-px flex-1 bg-border/50" />
                    )}
                  </div>
                  <div className={cn('pb-4', index === course.modules.length - 1 && 'pb-0')}>
                    <p className="text-sm font-medium">{module.title}</p>
                    <p className="mt-0.5 text-xs text-white/45">
                      {module.lessons.length} lessons ·{' '}
                      {module.lessons.map((l) => l.duration).join(', ').split(',')[0]}
                      {module.lessons.length > 1 ? '…' : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="p-5">
            <h3 className="text-sm font-semibold">Course Highlights</h3>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[14px] border border-border/30 bg-bg-secondary/30 p-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary/20">
                    <item.icon className="h-4 w-4 text-highlight" />
                  </div>
                  <p className="mt-2 text-xs font-medium">{item.title}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-white/45">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CourseMedia course={course} variant="video" overlay="light">
          <div className="relative flex h-full flex-col justify-center p-4">
            <div className="overflow-hidden rounded-[12px] border border-white/10 bg-bg-primary/80 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-border/30 px-3 py-2">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-400/70" />
                  <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                  <span className="h-2 w-2 rounded-full bg-green-400/70" />
                </div>
                <span className="truncate text-[10px] text-white/40">lumen.learn / {course.id}</span>
              </div>
              <div className="relative flex aspect-video items-center justify-center overflow-hidden">
                <img
                  src={getCourseCoverImage(course)}
                  alt={`${course.title} preview`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-bg-primary/50" />
                <div className="relative flex flex-col items-center gap-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary/40 ring-2 ring-accent-secondary/50 backdrop-blur-sm">
                    <MonitorPlay className="h-5 w-5 text-highlight" />
                  </div>
                  <p className="text-xs font-medium text-white">{course.title}</p>
                  <p className="text-[10px] text-white/60">Preview · {course.duration}</p>
                </div>
              </div>
              <div className="space-y-2 border-t border-border/30 p-3">
                <div className="h-1.5 w-full rounded-full bg-bg-secondary">
                  <div className="h-full w-1/3 rounded-full bg-accent-secondary" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-white/40">
                  <span>Lesson 1 of {course.lessons}</span>
                  <span>{course.instructor}</span>
                </div>
              </div>
            </div>
          </div>
        </CourseMedia>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold">Skills You&apos;ll Master</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent-secondary/25 bg-accent-primary/15 px-3 py-1 text-xs font-medium text-highlight"
              >
                {tag}
              </span>
            ))}
            <span className="rounded-full border border-border/40 bg-bg-secondary/40 px-3 py-1 text-xs text-white/50">
              {course.category}
            </span>
            <span className="rounded-full border border-border/40 bg-bg-secondary/40 px-3 py-1 text-xs text-white/50">
              {course.level}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
