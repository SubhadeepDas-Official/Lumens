import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Menu,
  MessageSquare,
  Play,
  SkipBack,
  SkipForward,
  X,
} from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCourseById } from '@/data/courses'
import { cn } from '@/lib/utils'

export default function StudentVideoPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>()
  const course = getCourseById(courseId || '')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedModules, setExpandedModules] = useState<string[]>(
    course?.modules.map((m) => m.id) || []
  )
  const [notes, setNotes] = useState('Key takeaways from this lesson...\n\n- Remember to practice hooks in isolation\n- useEffect cleanup is important')
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  if (!course) {
    return (
      <PageTransition>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold">Course not found</h2>
        </div>
      </PageTransition>
    )
  }

  const allLessons = course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleTitle: m.title, moduleId: m.id }))
  )
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId)
  const currentLesson = allLessons[currentIndex] || allLessons[0]
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
  const progressPercent = Math.round(((currentIndex + 1) / allLessons.length) * 100)
  const isCompleted = completed.has(currentLesson.id) || currentLesson.completed

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    )
  }

  const markComplete = () => {
    setCompleted((prev) => new Set([...prev, currentLesson.id]))
  }

  return (
    <PageTransition className="-mx-4 -my-6 sm:-mx-6 lg:-mx-8">
      <div className="flex min-h-[calc(100vh-8rem)] flex-col lg:flex-row">
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-border/30 bg-bg-secondary/50 px-4 py-3">
            <div className="flex items-center gap-3">
              <Link to={`/student/courses/${course.id}`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{currentLesson.title}</p>
                <p className="text-xs text-white/50">{course.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-white/50 sm:block">
                {currentIndex + 1} / {allLessons.length}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          <div className="relative flex-1 bg-black">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-secondary to-bg-primary">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <div className="mx-auto flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-accent-primary/30 backdrop-blur-sm transition-all hover:scale-105 hover:bg-accent-primary/50">
                  <Play className="h-8 w-8 text-white" fill="white" />
                </div>
                <p className="mt-4 text-lg font-medium">{currentLesson.title}</p>
                <p className="text-sm text-white/50">{currentLesson.duration}</p>
              </motion.div>
            </div>
          </div>

          <div className="border-t border-border/30 bg-bg-secondary/50 px-4 py-4">
            <Progress value={progressPercent} className="mb-4" />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {prevLesson ? (
                  <Link to={`/student/courses/${courseId}/learn/${prevLesson.id}`}>
                    <Button variant="ghost" size="sm">
                      <SkipBack className="h-4 w-4" />
                      Previous
                    </Button>
                  </Link>
                ) : (
                  <Button variant="ghost" size="sm" disabled>
                    <SkipBack className="h-4 w-4" />
                    Previous
                  </Button>
                )}
              </div>
              <Button
                variant={isCompleted ? 'secondary' : 'outline'}
                size="sm"
                onClick={markComplete}
                disabled={isCompleted}
                className="rounded-full"
              >
                <CheckCircle2 className="h-4 w-4" />
                {isCompleted ? 'Completed' : 'Mark Complete'}
              </Button>
              <div className="flex items-center gap-2">
                {nextLesson ? (
                  <Link to={`/student/courses/${courseId}/learn/${nextLesson.id}`}>
                    <Button variant="highlight" size="sm">
                      Next Lesson
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button variant="highlight" size="sm">
                    <CheckCircle2 className="h-4 w-4" />
                    Complete Course
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-border/30 p-4">
            <Tabs defaultValue="notes">
              <TabsList className="mb-4">
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>
              <TabsContent value="notes">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-32 w-full rounded-[16px] border border-border/50 bg-bg-secondary/50 px-4 py-3 text-sm"
                  placeholder="Take notes while learning..."
                />
                <p className="mt-2 text-xs text-white/40">Notes auto-save as you type</p>
              </TabsContent>
              <TabsContent value="resources">
                <div className="space-y-2">
                  {['Lesson Slides.pdf', 'Code Examples.zip', 'Reference Sheet.pdf'].map((file) => (
                    <div
                      key={file}
                      className="flex items-center justify-between rounded-[12px] bg-bg-secondary/30 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-highlight" />
                        <span className="text-sm">{file}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="discussion">
                <div className="space-y-3">
                  {[
                    { user: 'Priya S.', message: 'Great explanation of useEffect!', time: '2h ago' },
                    { user: 'Arjun M.', message: 'When should we use useCallback?', time: '5h ago' },
                  ].map((q) => (
                    <div key={q.message} className="rounded-[12px] bg-bg-secondary/30 p-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-highlight" />
                        <span className="text-sm font-medium">{q.user}</span>
                        <span className="text-xs text-white/40">{q.time}</span>
                      </div>
                      <p className="mt-2 text-sm text-white/70">{q.message}</p>
                    </div>
                  ))}
                  <textarea
                    className="min-h-20 w-full rounded-[16px] border border-border/50 bg-bg-secondary/50 px-4 py-3 text-sm"
                    placeholder="Ask a question..."
                  />
                  <Button variant="secondary" size="sm">
                    Post Question
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="fixed inset-y-0 right-0 z-50 w-full border-l border-border/30 bg-bg-secondary/95 backdrop-blur-xl lg:static lg:z-auto lg:block lg:w-80 lg:bg-bg-secondary/30 xl:w-96"
            >
              <div className="h-full overflow-y-auto p-4">
                <h3 className="mb-4 font-semibold">Lesson Playlist</h3>
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
                          {module.lessons.map((lesson) => {
                            const lessonDone = completed.has(lesson.id) || lesson.completed
                            return (
                              <Link
                                key={lesson.id}
                                to={`/student/courses/${courseId}/learn/${lesson.id}`}
                                className={cn(
                                  'flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm transition-colors',
                                  lesson.id === currentLesson.id
                                    ? 'bg-accent-primary/20 text-white'
                                    : 'text-white/60 hover:bg-bg-secondary/40 hover:text-white'
                                )}
                              >
                                {lessonDone ? (
                                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-secondary" />
                                ) : (
                                  <Play className="h-4 w-4 shrink-0 text-white/40" />
                                )}
                                <span className="flex-1 truncate">{lesson.title}</span>
                                <span className="text-xs text-white/40">{lesson.duration}</span>
                              </Link>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
