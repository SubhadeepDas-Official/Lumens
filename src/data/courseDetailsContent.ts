import type { Course } from '@/data/courses'

export const lumenAdvantages = [
  'Structured learning path from fundamentals to advanced topics',
  'Industry-ready tools and frameworks used in production today',
  '100% project-based learning with real-world assignments',
  'End-to-end mentorship from experienced instructors',
  'Mentors are active practitioners in their fields',
]

export const otherPrograms = [
  'Only surface-level topics covered',
  'Outdated or generic content',
  'Theory-heavy approach with little practice',
  'Stops before job-ready project work',
]

export const curriculumHighlights = [
  'Access to industry-ready curriculum',
  'Industry-level intense training',
  'Access to Discord community',
  '1-on-1 mentor sessions',
]

export const certificationPoints = [
  'Build and showcase real projects. Gain hands-on experience by working on live assignments.',
  'Receive expert mentorship and evaluation. Get detailed feedback from Lumen instructors.',
  'Earn a globally recognized certificate. On completion, receive a verified certificate.',
]

export const partnerLogos = ['Amazon', 'Walmart', 'TCS', 'Rapidops', 'Nagarro', 'Flipkart', 'Razorpay']

export const courseFaqs = [
  {
    question: 'What does this course teach?',
    answer:
      'It covers core concepts, practical workflows, hands-on projects, and how to apply modern tools inside real industry scenarios — all structured for career-ready outcomes.',
  },
  {
    question: 'Do I need strong math or coding skills before joining?',
    answer:
      'Basic computer literacy is enough for beginner tracks. Intermediate and advanced courses list recommended prerequisites in the curriculum overview.',
  },
  {
    question: 'How does this course fit into my career path?',
    answer:
      'Each module builds job-relevant skills with projects you can add to your portfolio, plus mentor feedback to help you interview with confidence.',
  },
  {
    question: 'Will I work on real projects?',
    answer:
      'Yes. Every Lumen course includes guided projects that mirror real workplace tasks, not just theory or quizzes.',
  },
  {
    question: 'What jobs does this course prepare me for?',
    answer:
      'Depending on the track, graduates pursue roles such as developer, designer, data analyst, marketer, or cloud engineer — aligned with the course category.',
  },
  {
    question: 'Will this course help me in interviews?',
    answer:
      'Yes. You will build portfolio projects, receive mentor reviews, and practice explaining your work — all critical for technical and behavioral interviews.',
  },
]

export function getModuleDescription(moduleTitle: string, courseTitle: string): string {
  return `Master ${moduleTitle.toLowerCase()} through guided lessons, exercises, and projects inside ${courseTitle}.`
}

export function getCoursePrerequisites(course: Course): string {
  if (course.level === 'Beginner') {
    return 'Basic computer literacy is recommended. No prior experience required.'
  }
  if (course.level === 'Intermediate') {
    return 'Familiarity with core concepts in this field is recommended.'
  }
  return 'Strong foundational knowledge and prior hands-on experience is recommended.'
}

export function getDurationWeeks(course: Course): string {
  const hours = parseInt(course.duration, 10)
  if (!Number.isNaN(hours)) {
    const weeks = Math.max(4, Math.round(hours / 3))
    return `${weeks} Weeks`
  }
  return course.duration
}

export function getWhatYouWillLearn(course: Course): string[] {
  const tagSkills = course.tags.map((tag) => `Master ${tag} through hands-on exercises and projects`)
  return [
    ...tagSkills,
    `Understand core ${course.category.toLowerCase()} workflows used in the industry`,
    'Complete real-world assignments reviewed by expert mentors',
    'Build portfolio-ready projects to showcase in interviews',
  ]
}

export function getWhoIsThisFor(course: Course): string[] {
  if (course.level === 'Beginner') {
    return [
      'Beginners starting a career in this field',
      'Students looking for structured, project-based learning',
      'Professionals upskilling into a new domain',
    ]
  }
  if (course.level === 'Intermediate') {
    return [
      'Developers or practitioners with some prior experience',
      'Learners who want to move from theory to production-ready skills',
      'Working professionals aiming for a promotion or role change',
    ]
  }
  return [
    'Experienced professionals deepening specialized expertise',
    'Engineers preparing for senior or architect-level roles',
    'Learners who want advanced, mentor-led project work',
  ]
}

export const courseIncludes = [
  { label: 'On-demand video lessons', value: 'HD quality' },
  { label: 'Downloadable resources', value: 'Included' },
  { label: 'Community access', value: 'Discord' },
  { label: 'Mentor support', value: '1-on-1 sessions' },
  { label: 'Certificate', value: 'On completion' },
  { label: 'Lifetime access', value: 'No expiry' },
]
