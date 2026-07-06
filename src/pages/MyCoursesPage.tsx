import { useState } from 'react'
import { PageTransition, FadeIn } from '@/components/animations/PageTransition'
import { CourseCard } from '@/components/courses/CourseCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getEnrolledCourses } from '@/data/courses'

export default function MyCoursesPage() {
  const enrolled = getEnrolledCourses()
  const completed = enrolled.filter((c) => (c.progress || 0) >= 100)
  const inProgress = enrolled.filter((c) => (c.progress || 0) < 100)
  const [activeTab, setActiveTab] = useState('in-progress')

  return (
    <PageTransition>
      <FadeIn>
        <h1 className="text-3xl font-bold">My Courses</h1>
        <p className="mt-1 text-white/60">
          {enrolled.length} courses enrolled &middot; {inProgress.length} in progress
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="in-progress">In Progress ({inProgress.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
            <TabsTrigger value="all">All Enrolled ({enrolled.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress">
            {inProgress.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {inProgress.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <EmptyState message="No courses in progress. Start learning!" />
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completed.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {completed.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <EmptyState message="Complete a course to see it here." />
            )}
          </TabsContent>

          <TabsContent value="all">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {enrolled.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </PageTransition>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[20px] border border-border/30 bg-bg-secondary/30 py-16">
      <p className="text-white/50">{message}</p>
    </div>
  )
}
