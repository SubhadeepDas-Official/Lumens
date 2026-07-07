import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Lock, Star, Users } from 'lucide-react'
import type { Course } from '@/data/courses'
import { useAuth } from '@/context/AuthContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatINR, formatIndianCount } from '@/lib/format'
import { CourseMedia } from '@/components/courses/CourseMedia'

interface CourseCardProps {
  course: Course
  variant?: 'default' | 'compact' | 'catalog'
}

export function CourseCard({ course, variant = 'default' }: CourseCardProps) {
  const { isAuthenticated } = useAuth()
  const isCatalog = variant === 'catalog'

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-glow-accent">
        <CourseMedia course={course} variant="card">
          <div className="relative h-full">
            <div className="absolute left-4 top-4 flex gap-2">
              <Badge variant="secondary">{course.category}</Badge>
              <Badge>{course.level}</Badge>
            </div>
            {course.progress !== undefined && (
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between text-xs text-fg-muted">
                  <span>{course.progress}% complete</span>
                </div>
                <Progress value={course.progress} className="mt-1.5 h-1.5" />
              </div>
            )}
          </div>
        </CourseMedia>

        <CardContent className="p-5">
          <h3 className="text-lg font-semibold leading-tight transition-colors group-hover:text-highlight">
            {course.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/50">{course.description}</p>

          <p className="mt-3 text-sm text-white/60">{course.instructor}</p>

          <div className="mt-4 flex items-center gap-4 text-xs text-white/50">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-highlight text-highlight" />
              {course.rating}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {formatIndianCount(course.students)} learners
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {course.duration}
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between">
            {isCatalog ? (
              <>
                <span className="text-xl font-bold text-highlight">{formatINR(course.price)}</span>
                <Link to={`/catalog/${course.id}`}>
                  <Button size="sm" variant="highlight">
                    View Details
                  </Button>
                </Link>
              </>
            ) : course.enrolled ? (
              <Link to={`/catalog/${course.id}`} className="w-full">
                <Button className="w-full" variant="default">
                  Continue Learning
                </Button>
              </Link>
            ) : (
              <>
                <span className="text-lg font-semibold text-highlight">{formatINR(course.price)}</span>
                {isAuthenticated ? (
                  <Link to={`/catalog/${course.id}`}>
                    <Button size="sm">Enroll Now</Button>
                  </Link>
                ) : (
                  <Link to="/login" state={{ from: { pathname: `/catalog/${course.id}` } }}>
                    <Button size="sm" variant="outline">
                      <Lock className="h-3.5 w-3.5" />
                      Sign in to buy
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
