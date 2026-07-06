import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { testimonials } from '@/data/courses'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs font-semibold text-highlight">{rating.toFixed(1)}</span>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < Math.round(rating) ? 'fill-highlight text-highlight' : 'text-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function CourseTestimonialsSection() {
  return (
    <section className="py-8">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-[16px] border border-border/40 bg-bg-secondary/30"
          >
            <div className="relative h-20">
              <img
                src={item.photo}
                alt={item.name}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/90 to-transparent" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2.5">
                <Avatar className="h-9 w-9 ring-2 ring-accent-primary/30">
                  <AvatarImage src={item.photo} alt={item.name} />
                  <AvatarFallback className="bg-accent-primary/30 text-xs text-highlight">
                    {item.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <p className="truncate text-[11px] text-white/50">{item.role}</p>
                </div>
              </div>
              <div className="mt-2">
                <StarRating rating={item.rating} />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/65">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
