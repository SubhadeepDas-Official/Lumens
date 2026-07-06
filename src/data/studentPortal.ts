import { getEnrolledCourses, type Course } from '@/data/courses'
import { getCourseCoverImage } from '@/lib/courseImages'

export interface StudentLiveClass {
  id: string
  title: string
  course: string
  instructor: string
  date: string
  time: string
  duration: string
  meetingLink: string
  status: 'upcoming' | 'past'
  attended?: boolean
  recording?: string
}

export interface StudentAssignment {
  id: string
  title: string
  course: string
  type: 'assignment' | 'quiz'
  deadline: string
  status: 'pending' | 'submitted' | 'graded'
  score?: number
  maxScore: number
  feedback?: string
}

export interface StudentCertificate {
  id: string
  courseId: string
  courseTitle: string
  instructor: string
  completedDate: string
  credentialId: string
  thumbnail: string
}

export interface StudentPurchase {
  id: string
  courseTitle: string
  amount: number
  date: string
  method: string
  status: 'completed' | 'refunded'
  invoiceId: string
}

export interface StudentAnnouncement {
  id: string
  title: string
  course: string
  message: string
  date: string
  unread: boolean
}

export interface StudentActivity {
  id: string
  action: string
  detail: string
  course: string
  time: string
}

export const studentStats = {
  purchasedCourses: getEnrolledCourses().length + 1,
  completedCourses: 1,
  hoursLearned: 47,
  certificatesEarned: 2,
  learningStreak: 12,
  weeklyGoalHours: 4,
  weeklyCompletedHours: 3,
}

export const studentAnnouncements: StudentAnnouncement[] = [
  {
    id: '1',
    title: 'New module released: Advanced Hooks',
    course: 'Full Stack Web Development',
    message: 'A new module on advanced React hooks is now available.',
    date: 'Jul 5, 2026',
    unread: true,
  },
  {
    id: '2',
    title: 'Live class rescheduled',
    course: 'UI/UX Design Masterclass',
    message: 'Friday design workshop moved to 4:00 PM IST.',
    date: 'Jul 4, 2026',
    unread: false,
  },
  {
    id: '3',
    title: 'Assignment deadline reminder',
    course: 'Mobile App Development',
    message: 'Navigation assignment due in 2 days.',
    date: 'Jul 3, 2026',
    unread: true,
  },
]

export const studentLiveClasses: StudentLiveClass[] = [
  {
    id: '1',
    title: 'React Hooks Deep Dive',
    course: 'Full Stack Web Development',
    instructor: 'Dr. Sarah Chen',
    date: 'Jul 7, 2026',
    time: '10:00 AM',
    duration: '90 min',
    meetingLink: 'https://meet.lumen.learn/react-hooks',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Design Systems Workshop',
    course: 'UI/UX Design Masterclass',
    instructor: 'Marcus Rivera',
    date: 'Jul 7, 2026',
    time: '4:00 PM',
    duration: '60 min',
    meetingLink: 'https://meet.lumen.learn/design-systems',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'AWS Architecture Q&A',
    course: 'Cloud Architecture with AWS',
    instructor: 'David Kim',
    date: 'Jul 3, 2026',
    time: '11:00 AM',
    duration: '75 min',
    meetingLink: 'https://meet.lumen.learn/aws-qa',
    status: 'past',
    attended: true,
    recording: 'Available',
  },
]

export const studentAssignments: StudentAssignment[] = [
  {
    id: '1',
    title: 'Build a REST API',
    course: 'Full Stack Web Development',
    type: 'assignment',
    deadline: 'Jul 12, 2026',
    status: 'pending',
    maxScore: 100,
  },
  {
    id: '2',
    title: 'React Fundamentals Quiz',
    course: 'Full Stack Web Development',
    type: 'quiz',
    deadline: 'Jul 8, 2026',
    status: 'graded',
    score: 88,
    maxScore: 100,
    feedback: 'Great understanding of hooks. Review useEffect cleanup patterns.',
  },
  {
    id: '3',
    title: 'Figma Prototype',
    course: 'UI/UX Design Masterclass',
    type: 'assignment',
    deadline: 'Jul 10, 2026',
    status: 'submitted',
    maxScore: 50,
  },
  {
    id: '4',
    title: 'Color Theory Quiz',
    course: 'UI/UX Design Masterclass',
    type: 'quiz',
    deadline: 'Jul 6, 2026',
    status: 'graded',
    score: 92,
    maxScore: 100,
    feedback: 'Excellent grasp of color harmony principles.',
  },
]

export const studentCertificates: StudentCertificate[] = [
  {
    id: 'cert-1',
    courseId: '1',
    courseTitle: 'HTML & CSS Fundamentals',
    instructor: 'Dr. Sarah Chen',
    completedDate: 'Jun 15, 2026',
    credentialId: 'LUM-2026-HTML-4821',
    thumbnail: 'https://images.unsplash.com/photo-1434030214721-735b896f68de?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cert-2',
    courseId: '2',
    courseTitle: 'Design Thinking Basics',
    instructor: 'Marcus Rivera',
    completedDate: 'May 28, 2026',
    credentialId: 'LUM-2026-DT-3194',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80',
  },
]

export const studentPurchases: StudentPurchase[] = [
  {
    id: 'ORD-3042',
    courseTitle: 'Full Stack Web Development',
    amount: 7499,
    date: 'Jan 12, 2026',
    method: 'UPI',
    status: 'completed',
    invoiceId: 'INV-3042',
  },
  {
    id: 'ORD-2988',
    courseTitle: 'UI/UX Design Masterclass',
    amount: 5799,
    date: 'Feb 3, 2026',
    method: 'Card',
    status: 'completed',
    invoiceId: 'INV-2988',
  },
  {
    id: 'ORD-3110',
    courseTitle: 'Mobile App Development',
    amount: 6699,
    date: 'Mar 8, 2026',
    method: 'Net Banking',
    status: 'completed',
    invoiceId: 'INV-3110',
  },
]

export const studentActivities: StudentActivity[] = [
  { id: '1', action: 'Completed lesson', detail: 'State & Hooks', course: 'Full Stack Web Development', time: '2 hours ago' },
  { id: '2', action: 'Started lesson', detail: 'Color Theory', course: 'UI/UX Design Masterclass', time: 'Yesterday' },
  { id: '3', action: 'Earned certificate', detail: 'Design Thinking Basics', course: 'UI/UX Design', time: '3 days ago' },
  { id: '4', action: 'Submitted assignment', detail: 'Figma Prototype', course: 'UI/UX Design Masterclass', time: '4 days ago' },
  { id: '5', action: 'Joined live class', detail: 'React Hooks Deep Dive', course: 'Full Stack Web Development', time: '1 week ago' },
]

export function getLastWatchedLesson(course: Course): { id: string; title: string } {
  const allLessons = course.modules.flatMap((m) => m.lessons)
  const next = allLessons.find((l) => !l.completed)
  const lesson = next ?? allLessons[allLessons.length - 1]
  return lesson ? { id: lesson.id, title: lesson.title } : { id: 'l1', title: 'Course Introduction' }
}

export function getEnrolledCoursesWithMeta() {
  return getEnrolledCourses().map((course) => ({
    ...course,
    thumbnail: getCourseCoverImage(course),
    lastLesson: getLastWatchedLesson(course),
  }))
}

export const weeklyProgress = [0, 45, 30, 60, 75, 40, 55]
