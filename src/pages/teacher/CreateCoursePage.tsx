import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageTransition } from '@/components/animations/PageTransition'
import { TeacherPageHeader } from '@/components/teacher/TeacherUI'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const steps = ['Basics', 'Media', 'Pricing', 'Outcomes']

export default function CreateCoursePage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  return (
    <PageTransition>
      <TeacherPageHeader
        title="Create Course"
        description="Build and publish a new course in a few steps."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <button key={s} type="button" onClick={() => setStep(i)}>
            <Badge variant={step === i ? 'default' : 'secondary'} className="cursor-pointer px-4 py-1.5">
              {i + 1}. {s}
            </Badge>
          </button>
        ))}
      </div>

      <Card className="rounded-[18px]">
        <CardContent className="space-y-5 p-6">
          {step === 0 && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Course Title</Label><Input placeholder="e.g. Full Stack Web Development" /></div>
                <div className="space-y-2"><Label>Subtitle</Label><Input placeholder="Short catchy subtitle" /></div>
              </div>
              <div className="space-y-2"><Label>Description</Label><textarea className="min-h-28 w-full rounded-[16px] border border-border/50 bg-bg-secondary/50 px-4 py-3 text-sm" placeholder="Describe your course..." /></div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2"><Label>Category</Label><Input placeholder="Development" /></div>
                <div className="space-y-2"><Label>Difficulty Level</Label><Input placeholder="Intermediate" /></div>
                <div className="space-y-2"><Label>Language</Label><Input placeholder="English" /></div>
              </div>
              <div className="space-y-2"><Label>Duration</Label><Input placeholder="42 hours" /></div>
            </>
          )}
          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className={cn('flex min-h-40 flex-col items-center justify-center rounded-[16px] border border-dashed border-border/50 bg-bg-secondary/30 p-6')}>
                <p className="text-sm font-medium">Course Thumbnail</p>
                <p className="mt-1 text-xs text-white/45">PNG, JPG up to 5MB</p>
                <Button variant="outline" size="sm" className="mt-4">Upload Image</Button>
              </div>
              <div className="flex min-h-40 flex-col items-center justify-center rounded-[16px] border border-dashed border-border/50 bg-bg-secondary/30 p-6">
                <p className="text-sm font-medium">Promotional Video</p>
                <p className="mt-1 text-xs text-white/45">MP4 up to 500MB</p>
                <Button variant="outline" size="sm" className="mt-4">Upload Video</Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Pricing (₹)</Label><Input type="number" placeholder="7499" /></div>
              <div className="space-y-2"><Label>Discount (%)</Label><Input type="number" placeholder="10" /></div>
            </div>
          )}
          {step === 3 && (
            <>
              <div className="space-y-2"><Label>Learning Outcomes</Label><textarea className="min-h-24 w-full rounded-[16px] border border-border/50 bg-bg-secondary/50 px-4 py-3 text-sm" placeholder="One outcome per line..." /></div>
              <div className="space-y-2"><Label>Prerequisites</Label><textarea className="min-h-20 w-full rounded-[16px] border border-border/50 bg-bg-secondary/50 px-4 py-3 text-sm" placeholder="What should students know before enrolling?" /></div>
            </>
          )}

          <div className="flex flex-wrap gap-3 border-t border-border/30 pt-5">
            {step > 0 && <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
            {step < steps.length - 1 ? (
              <Button variant="highlight" onClick={() => setStep(step + 1)}>Continue</Button>
            ) : (
              <>
                <Button variant="outline">Save Draft</Button>
                <Button variant="highlight" onClick={() => navigate('/teacher/courses')}>Publish Course</Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </PageTransition>
  )
}
