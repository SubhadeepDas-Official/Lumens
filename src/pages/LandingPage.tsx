import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Play,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { PageTransition, staggerContainer, fadeInUp } from '@/components/animations/PageTransition'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/context/AuthContext'
import { getEnrolledCourses } from '@/data/courses'
import { getDashboardPath } from '@/lib/roles'

function AuthenticatedPreview() {
  const { user } = useAuth()
  const enrolled = getEnrolledCourses()
  const featured = enrolled[0]
  const totalProgress = enrolled.length
    ? Math.round(enrolled.reduce((acc, c) => acc + (c.progress || 0), 0) / enrolled.length)
    : 0

  return (
    <div className="mt-16 w-full max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="mb-8 grid w-full grid-cols-3 gap-3 sm:gap-4"
      >
        {[
          { value: String(enrolled.length), label: 'Enrolled' },
          { value: `${totalProgress}%`, label: 'Avg. progress' },
          { value: user?.name.split(' ')[0] ?? '—', label: 'Welcome back' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-[20px] border border-border/40 bg-bg-secondary/30 px-4 py-5 backdrop-blur-sm sm:px-6 sm:py-6"
          >
            <p className="text-xl font-bold text-highlight sm:text-2xl">{stat.value}</p>
            <p className="mt-1 text-[12px] text-white/40 sm:text-[13px]">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <div className="overflow-hidden rounded-[24px] border border-border/50 bg-bg-secondary/20 shadow-glow backdrop-blur-sm">
          <div className="grid md:grid-cols-2">
            <div className="border-b border-border/30 p-6 sm:p-8 md:border-b-0 md:border-r">
              <p className="mb-4 text-[12px] font-medium uppercase tracking-wider text-white/35">
                Continue learning
              </p>
              {featured ? (
                <Link to={`/catalog/${featured.id}`}>
                  <div className="rounded-[18px] border border-border/40 bg-bg-primary/50 p-5 transition-colors hover:border-accent-secondary/40">
                    <div className={`mb-4 h-24 rounded-[14px] bg-gradient-to-br ${featured.image}`} />
                    <h3 className="text-[15px] font-semibold">{featured.title}</h3>
                    <p className="mt-1 text-[13px] text-white/40">
                      {featured.modules[0]?.title ?? 'Getting started'}
                    </p>
                    {featured.progress !== undefined && (
                      <div className="mt-4">
                        <div className="mb-1.5 flex items-center justify-between text-[11px] text-white/40">
                          <span>Progress</span>
                          <span>{featured.progress}%</span>
                        </div>
                        <Progress value={featured.progress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                </Link>
              ) : (
                <p className="text-sm text-white/50">No enrolled courses yet.</p>
              )}
            </div>

            <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
              {[
                { icon: BookOpen, title: 'Structured tracks', description: 'From basics to expert.', href: '/courses' },
                { icon: Users, title: 'Live cohorts', description: 'Learn together weekly.', href: getDashboardPath(user?.role ?? 'student') },
              ].map((feature) => (
                <Link key={feature.title} to={feature.href}>
                  <div className="flex items-center gap-4 rounded-[18px] border border-border/30 bg-bg-primary/30 p-4 transition-colors hover:bg-bg-primary/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-primary/25">
                      <feature.icon className="h-[18px] w-[18px] text-highlight" />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium">{feature.title}</p>
                      <p className="text-[13px] text-white/40">{feature.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to={getDashboardPath(user?.role ?? 'student')}>
            <Button variant="highlight" className="rounded-full px-7">
              Go to dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth()

  return (
    <PageTransition>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[10%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-accent-primary/12 blur-[120px]" />
          <div className="absolute left-1/2 top-[35%] h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-accent-secondary/8 blur-[100px]" />
        </div>

        {/* Hero */}
        <section className="flex flex-col items-center px-4 pb-20 pt-32 text-center sm:px-6 sm:pt-40">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex max-w-3xl flex-col items-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-bg-secondary/40 px-4 py-1.5 text-[13px] text-white/70 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-highlight" />
                {isAuthenticated ? 'Welcome back to Lumen' : 'Cohort 12 enrollments open'}
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-[2.75rem] font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.25rem]"
            >
              Learn the craft.
              <br />
              <span className="text-highlight">Ship your career.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/45 sm:text-base"
            >
              {isAuthenticated
                ? 'Your courses, progress, and learning data are ready. Pick up where you left off.'
                : 'A premium academy for ambitious learners. Sign in to access courses, track progress, and unlock your dashboard.'}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
            >
              {isAuthenticated ? (
                <>
                  <Link to={getDashboardPath(user?.role ?? 'student')}>
                    <Button
                      variant="highlight"
                      size="lg"
                      className="group h-12 rounded-full px-7 text-[15px] shadow-[0_0_40px_rgba(12,150,156,0.35)]"
                    >
                      Open dashboard
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                  <Link to="/courses">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 rounded-full border-border/50 bg-transparent px-7 text-[15px] text-white/70 hover:bg-white/5 hover:text-white"
                    >
                      <Play className="h-4 w-4" />
                      My courses
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <Button
                      variant="highlight"
                      size="lg"
                      className="group h-12 rounded-full px-7 text-[15px] shadow-[0_0_40px_rgba(12,150,156,0.35)] hover:shadow-[0_0_50px_rgba(12,150,156,0.45)]"
                    >
                      Start learning free
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                  <Link to="/catalog">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 rounded-full border-border/50 bg-transparent px-7 text-[15px] text-white/70 hover:bg-white/5 hover:text-white"
                    >
                      <Play className="h-4 w-4" />
                      Browse courses
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>

            {!isAuthenticated && (
              <motion.div
                variants={fadeInUp}
                className="mt-8 flex items-center gap-2 text-[13px] text-white/35"
              >
                <Shield className="h-3.5 w-3.5" />
                Course data and progress are only visible after authentication
              </motion.div>
            )}
          </motion.div>

          {isAuthenticated && <AuthenticatedPreview />}
        </section>

        {/* Why Lumen — public marketing section */}
        <FeaturesSection />
      </div>
    </PageTransition>
  )
}
