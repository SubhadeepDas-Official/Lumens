import { useState } from 'react'
import { GripVertical, Lock, LockOpen, Plus, Trash2, Upload, Eye } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { TeacherPageHeader } from '@/components/teacher/TeacherUI'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { courseSections as initialSections } from '@/data/teacherPortal'

type Lesson = (typeof initialSections)[0]['lessons'][0] & { id: string }
type Section = { id: string; title: string; lessons: Lesson[] }

export default function CourseContentPage() {
  const [sections, setSections] = useState<Section[]>(initialSections as Section[])
  const [dragItem, setDragItem] = useState<{ sectionId: string; lessonId: string } | null>(null)

  const handleDrop = (targetSectionId: string, targetLessonId: string) => {
    if (!dragItem) return
    setSections((prev) => {
      const next = structuredClone(prev)
      const fromSection = next.find((s) => s.id === dragItem.sectionId)
      const toSection = next.find((s) => s.id === targetSectionId)
      if (!fromSection || !toSection) return prev
      const lessonIdx = fromSection.lessons.findIndex((l) => l.id === dragItem.lessonId)
      if (lessonIdx === -1) return prev
      const [lesson] = fromSection.lessons.splice(lessonIdx, 1)
      const targetIdx = toSection.lessons.findIndex((l) => l.id === targetLessonId)
      toSection.lessons.splice(targetIdx, 0, lesson)
      return next
    })
    setDragItem(null)
  }

  return (
    <PageTransition>
      <TeacherPageHeader
        title="Course Content"
        description="Organize sections and lessons. Drag to reorder."
        action={<Button variant="highlight"><Plus className="h-4 w-4" />Add Section</Button>}
      />

      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.id} className="rounded-[18px]">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">{section.title}</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline"><Plus className="h-3.5 w-3.5" />Lesson</Button>
                  <Button size="sm" variant="ghost"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
              <div className="space-y-2">
                {section.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    draggable
                    onDragStart={() => setDragItem({ sectionId: section.id, lessonId: lesson.id })}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(section.id, lesson.id)}
                    className="flex flex-wrap items-center gap-3 rounded-[14px] border border-border/30 bg-bg-secondary/30 px-4 py-3"
                  >
                    <GripVertical className="h-4 w-4 cursor-grab text-white/30" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{lesson.title}</p>
                      <p className="text-xs capitalize text-white/45">{lesson.type}</p>
                    </div>
                    {lesson.freePreview && <Badge variant="success">Free Preview</Badge>}
                    <div className="flex flex-wrap gap-1">
                      <Button size="sm" variant="ghost"><Upload className="h-3.5 w-3.5" /></Button>
                      <Button size="sm" variant="ghost"><Eye className="h-3.5 w-3.5" /></Button>
                      <Button size="sm" variant="ghost">
                        {lesson.locked ? <Lock className="h-3.5 w-3.5" /> : <LockOpen className="h-3.5 w-3.5" />}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageTransition>
  )
}
