import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { formatINR } from '@/lib/format'

interface CourseStickyBarProps {
  courseId: string
  price: number
}

export function CourseStickyBar({ courseId, price }: CourseStickyBarProps) {
  const { isAuthenticated } = useAuth()

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-full border border-border/50 bg-bg-secondary/90 px-3 py-2 shadow-glow backdrop-blur-xl sm:gap-3 sm:px-4">
        <Link to="/catalog" className="flex-1 sm:flex-none">
          <Button variant="ghost" size="sm" className="w-full rounded-full text-xs sm:text-sm">
            Courses
          </Button>
        </Link>
        <Button variant="outline" size="sm" className="hidden flex-1 rounded-full text-xs sm:flex sm:text-sm">
          Request Callback
        </Button>
        {isAuthenticated ? (
          <Button variant="highlight" size="sm" className="flex-1 rounded-full text-xs sm:text-sm">
            Buy Now — {formatINR(price)}
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        ) : (
          <Link
            to="/login"
            state={{ from: { pathname: `/catalog/${courseId}` }, action: 'enroll' }}
            className="flex-1"
          >
            <Button variant="highlight" size="sm" className="w-full rounded-full text-xs sm:text-sm">
              Buy Now — {formatINR(price)}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
