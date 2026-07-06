import { CheckCircle2, Target, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Course } from '@/data/courses'
import {
  getCoursePrerequisites,
  getWhatYouWillLearn,
  getWhoIsThisFor,
} from '@/data/courseDetailsContent'

interface CourseQuickInfoProps {
  course: Course
}

export function CourseQuickInfo({ course }: CourseQuickInfoProps) {
  const sections = [
    {
      icon: CheckCircle2,
      title: "What You'll Learn",
      items: getWhatYouWillLearn(course),
    },
    {
      icon: Users,
      title: 'Who This Course Is For',
      items: getWhoIsThisFor(course),
    },
    {
      icon: Target,
      title: 'Requirements',
      items: [getCoursePrerequisites(course)],
    },
  ]

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {sections.map((section, index) => (
          <div key={section.title}>
            {index > 0 && <Separator />}
            <div className="p-5">
              <div className="flex items-center gap-2">
                <section.icon className="h-4 w-4 text-highlight" />
                <h3 className="text-sm font-semibold">{section.title}</h3>
              </div>
              <ul className="mt-3 space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/65">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
