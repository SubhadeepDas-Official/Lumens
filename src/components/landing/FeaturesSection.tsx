import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Award,
  BookOpen,
  CheckCircle2,
  Star,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  tag: string
}

const features: Feature[] = [
  {
    icon: Zap,
    title: 'Momentum by design',
    description: 'Bite-sized lessons, streak system, and adaptive review.',
    tag: 'Engagement',
  },
  {
    icon: Users,
    title: 'Live mentorship',
    description: 'Weekly office hours with practitioners from top teams.',
    tag: 'Community',
  },
  {
    icon: Award,
    title: 'Portfolio outcomes',
    description: 'Ship real projects graded against industry rubrics.',
    tag: 'Outcomes',
  },
  {
    icon: BookOpen,
    title: 'Depth on demand',
    description: "Reference-quality lessons you'll come back to.",
    tag: 'Curriculum',
  },
  {
    icon: Star,
    title: 'Curated instructors',
    description: 'Only ~3% of applicants make it onto Lumen.',
    tag: 'Quality',
  },
  {
    icon: CheckCircle2,
    title: 'Career support',
    description: 'Reviews, referrals, and interview prep included.',
    tag: 'Growth',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

function FeatureCard({
  feature,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  feature: Feature
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const Icon = feature.icon

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={cardVariants}
      className="h-full"
    >
      <button
        type="button"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onFocus={onHover}
        onBlur={onLeave}
        className={cn(
          'group relative flex h-full min-h-[220px] w-full flex-col rounded-[22px] border p-8 text-left outline-none',
          'transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-accent-secondary/50',
          isHovered
            ? '-translate-y-1 border-accent-secondary/50 bg-bg-secondary/90 shadow-[0_8px_32px_rgba(12,150,156,0.12)]'
            : 'border-border/50 bg-bg-secondary/60'
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute inset-0 rounded-[22px] bg-gradient-to-br from-accent-primary/10 via-transparent to-highlight/5 transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />

        <div className="relative flex flex-1 flex-col">
          <div className="mb-6 flex items-start justify-between">
            <div
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300',
                isHovered
                  ? 'bg-gradient-to-br from-accent-primary to-accent-secondary shadow-[0_0_20px_rgba(12,150,156,0.35)]'
                  : 'border border-border/40 bg-bg-primary/40'
              )}
            >
              <Icon
                className={cn(
                  'h-[19px] w-[19px] transition-colors duration-300',
                  isHovered ? 'text-white' : 'text-white/45'
                )}
              />
            </div>

            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300',
                isHovered
                  ? 'bg-accent-primary/25 text-highlight opacity-100'
                  : 'opacity-0'
              )}
            >
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <span
            className={cn(
              'text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300',
              isHovered ? 'text-highlight' : 'text-accent-primary/80'
            )}
          >
            {feature.tag}
          </span>

          <h3
            className={cn(
              'mt-2 text-[16px] font-semibold transition-colors duration-300',
              isHovered ? 'text-white' : 'text-white/90'
            )}
          >
            {feature.title}
          </h3>

          <p
            className={cn(
              'mt-2 flex-1 text-[14px] leading-relaxed transition-colors duration-300',
              isHovered ? 'text-white/60' : 'text-white/45'
            )}
          >
            {feature.description}
          </p>

          <span
            className={cn(
              'mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium transition-all duration-300',
              isHovered ? 'translate-y-0 text-highlight opacity-100' : 'translate-y-1 text-highlight/0 opacity-0'
            )}
          >
            Explore feature
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </button>
    </motion.div>
  )
}

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="why-lumen" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-primary">
            Why Lumen
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            A studio-grade learning experience.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/45 sm:text-base">
            Every detail — from lesson pacing to mentor feedback — is designed to keep
            momentum and turn curiosity into skill.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
              isHovered={hoveredIndex === i}
              onHover={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
