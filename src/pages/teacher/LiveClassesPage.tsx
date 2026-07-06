import { useState } from 'react'
import { Calendar, Edit, ExternalLink, Play, Plus, Video, X } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { TeacherPageHeader } from '@/components/teacher/TeacherUI'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { liveClasses } from '@/data/teacherPortal'
import { cn } from '@/lib/utils'

export default function LiveClassesPage() {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')
  const filtered = liveClasses.filter((c) => c.status === tab || (tab === 'upcoming' && c.status === 'live'))

  return (
    <PageTransition>
      <TeacherPageHeader
        title="Live Classes"
        description="Schedule and manage your live sessions."
        action={<Button variant="highlight"><Plus className="h-4 w-4" />Schedule Class</Button>}
      />

      <Card className="mb-6 rounded-[18px]">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <Calendar className="h-4 w-4" />
            July 2026 — 2 classes scheduled this week
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-white/40">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
            {Array.from({ length: 35 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-lg py-2',
                  i === 8 || i === 10 ? 'bg-accent-primary/25 font-medium text-white' : 'text-white/50'
                )}
              >
                {(i % 31) + 1}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mb-4 flex gap-2">
        {(['upcoming', 'past'] as const).map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)}>
            <Badge variant={tab === t ? 'default' : 'secondary'} className="cursor-pointer capitalize">
              {t} Classes
            </Badge>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((cls) => (
          <Card key={cls.id} className="rounded-[18px]">
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-primary/20">
                  <Video className="h-5 w-5 text-highlight" />
                </div>
                <div>
                  <h3 className="font-semibold">{cls.title}</h3>
                  <p className="text-sm text-white/50">{cls.course}</p>
                  <p className="mt-1 text-xs text-white/40">{cls.date} · {cls.time} · {cls.duration}</p>
                  {cls.recording && <Badge variant="secondary" className="mt-2">Recording: {cls.recording}</Badge>}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-white/45">{cls.attendees} enrolled</span>
                {cls.status === 'upcoming' && (
                  <>
                    <Button size="sm" variant="highlight"><Play className="h-3.5 w-3.5" />Start</Button>
                    <Button size="sm" variant="outline"><ExternalLink className="h-3.5 w-3.5" />Link</Button>
                    <Button size="sm" variant="ghost"><Edit className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="ghost"><X className="h-3.5 w-3.5" /></Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageTransition>
  )
}
