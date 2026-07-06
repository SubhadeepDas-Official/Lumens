import { useState } from 'react'
import { Paperclip, Search, Send } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { TeacherPageHeader } from '@/components/teacher/TeacherUI'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { messageThreads } from '@/data/teacherPortal'
import { cn } from '@/lib/utils'

export default function MessagesPage() {
  const [selected, setSelected] = useState(messageThreads[0]?.id)
  const active = messageThreads.find((m) => m.id === selected)

  return (
    <PageTransition>
      <TeacherPageHeader title="Messages" description="Communicate with your students." />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card className="rounded-[18px]">
          <CardContent className="p-0">
            <div className="border-b border-border/30 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </div>
            {messageThreads.map((thread) => (
              <button
                key={thread.id}
                type="button"
                onClick={() => setSelected(thread.id)}
                className={cn(
                  'flex w-full items-start gap-3 border-b border-border/20 p-4 text-left transition-colors hover:bg-bg-secondary/30',
                  selected === thread.id && 'bg-accent-primary/10'
                )}
              >
                <img src={thread.photo} alt={thread.student} className="h-10 w-10 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">{thread.student}</p>
                    {thread.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-accent-secondary" />}
                  </div>
                  <p className="truncate text-xs text-white/45">{thread.preview}</p>
                  <p className="mt-1 text-[10px] text-white/35">{thread.time}</p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="flex min-h-[400px] flex-col rounded-[18px]">
          <CardContent className="flex flex-1 flex-col p-0">
            {active && (
              <>
                <div className="flex items-center gap-3 border-b border-border/30 p-4">
                  <img src={active.photo} alt={active.student} className="h-9 w-9 rounded-full object-cover" />
                  <p className="font-medium">{active.student}</p>
                </div>
                <div className="flex-1 space-y-3 p-4">
                  <div className="max-w-[80%] rounded-[14px] bg-bg-secondary/50 px-4 py-3 text-sm">
                    {active.preview}
                  </div>
                  <div className="ml-auto max-w-[80%] rounded-[14px] bg-accent-primary/25 px-4 py-3 text-sm">
                    Hi! I'll review your submission and get back to you shortly.
                  </div>
                </div>
                <div className="flex gap-2 border-t border-border/30 p-4">
                  <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
                  <Input placeholder="Type a reply..." className="flex-1" />
                  <Button variant="highlight" size="icon"><Send className="h-4 w-4" /></Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
