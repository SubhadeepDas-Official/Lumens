import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Play,
  Star,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { PageTransition } from '@/components/animations/PageTransition'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { AccordionItem } from '@/components/ui/accordion'
import { getCourseById } from '@/data/courses'
import { getLastWatchedLesson } from '@/data/studentPortal'
import { cn } from '@/lib/utils'

export default function StudentCourseDetailsPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = getCourseById(courseId || '')
  const [expandedModules, setExpandedModules] = useState<string[]>(
    course?.modules.map((m) => m.id) || []
  )

  if (!course) {
    return (
      <PageTransition>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold">Course not found</h2>
        </div>
      </PageTransition>
    )
  }

  const lastLesson = getLastWatchedLesson(course)
  const completedLessons = course.modules.flatMap((m) => m.lessons).filter((l) => l.completed).length
  const totalLessons = course.modules.flatMap((m) => m.lessons).length

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    )
  }

  return (
    <PageTransition>
      <div className="mb-6 overflow-hidden rounded-[20px]">
        <div className="relative aspect-[21/9] min-h-[200px]">
          <img
            src={course.coverImage}
            alt={course.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <Badge className="mb-3">{course.category}</Badge>
            <h1 className="text-2xl font-bold sm:text-3xl">{course.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/70">{course.description}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="rounded-[18px]">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Your Progress</h2>
                <span className="text-sm text-highlight">{course.progress ?? 0}%</span>
              </div>
              <Progress value={course.progress ?? 0} className="h-2" />
              <p className="mt-2 text-sm text-white/50">
                {completedLessons} of {totalLessons} lessons completed
              </p>
              <Link to={`/student/courses/${course.id}/learn/${lastLesson.id}`}>
                <Button variant="highlight" className="mt-4 w-full sm:w-auto">
                  <Play className="h-4 w-4" />
                  Continue from {lastLesson.title}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-[18px]">
            <CardContent className="p-5">
              <h2 className="mb-4 text-lg font-semibold">Curriculum</h2>
              {course.modules.map((module) => (
                <div key={module.id} className="mb-3">
                  <button
                    type="button"
                    onClick={() => toggleModule(module.id)}
                    className="flex w-full items-center justify-between rounded-[12px] px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-bg-secondary/60"
                  >
                    {module.title}
                    {expandedModules.includes(module.id) ? (
                      <ChevronUp className="h-4 w-4 text-white/40" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white/40" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedModules.includes(module.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        {module.lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            to={`/student/courses/${course.id}/learn/${lesson.id}`}
                            className={cn(
                              'flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm transition-colors',
                              lesson.completed
                                ? 'text-white/60'
                                : 'text-white/80 hover:bg-bg-secondary/40'
                            )}
                          >
                            <Play className="h-3.5 w-3.5 shrink-0 text-white/40" />
                            <span className="flex-1">{lesson.title}</span>
                            <span className="text-xs text-white/40">{lesson.duration}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[18px]">
            <CardContent className="p-5">
              <h2 className="mb-4 text-lg font-semibold">Resources & Notes</h2>
              <AccordionItem title={<span className="font-medium">Course Notes (PDF)</span>}>
                <div className="flex items-center justify-between rounded-[12px] bg-bg-secondary/30 p-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-highlight" />
                    <span className="text-sm">Complete Course Notes</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </AccordionItem>
              <AccordionItem title={<span className="font-medium">Downloadable Resources</span>}>
                {['Project Starter Kit.zip', 'Cheat Sheet.pdf', 'Reference Links.txt'].map((file) => (
                  <div
                    key={file}
                    className="mb-2 flex items-center justify-between rounded-[12px] bg-bg-secondary/30 p-3"
                  >
                    <span className="text-sm">{file}</span>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </AccordionItem>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="rounded-[18px]">
            <CardContent className="p-5">
              <h3 className="mb-4 font-semibold">Instructor</h3>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary/30 text-sm font-bold">
                  {course.instructorAvatar}
                </div>
                <div>
                  <p className="font-medium">{course.instructor}</p>
                  <p className="text-xs text-white/50">Course Instructor</p>
                </div>
              </div>
              <div className="mt-4 flex gap-4 text-sm text-white/50">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-highlight text-highlight" />
                  {course.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.students.toLocaleString('en-IN')}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[18px]">
            <CardContent className="p-5">
              <h3 className="mb-3 font-semibold">Course Info</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-white/50">Level</dt>
                  <dd>{course.level}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/50">Duration</dt>
                  <dd>{course.duration}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/50">Lessons</dt>
                  <dd>{course.lessons}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}
