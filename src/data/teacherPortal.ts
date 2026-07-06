import { courses } from '@/data/courses'
import { getCourseCoverImage } from '@/lib/courseImages'

export type CourseStatus = 'published' | 'draft' | 'archived'

export interface TeacherCourse {
  id: string
  title: string
  category: string
  students: number
  rating: number
  completionRate: number
  lastUpdated: string
  status: CourseStatus
  thumbnail: string
  image: string
}

export interface TeacherStudent {
  id: string
  name: string
  email: string
  photo: string
  progress: number
  assignmentsCompleted: number
  assignmentsTotal: number
  attendance: number
  lastActive: string
  course: string
}

export interface LiveClass {
  id: string
  title: string
  course: string
  date: string
  time: string
  duration: string
  meetingLink: string
  status: 'upcoming' | 'past' | 'live'
  attendees: number
  recording?: string
}

export interface Assignment {
  id: string
  title: string
  course: string
  deadline: string
  submissions: number
  pending: number
  totalMarks: number
}

export interface MessageThread {
  id: string
  student: string
  photo: string
  preview: string
  time: string
  unread: boolean
}

export interface Announcement {
  id: string
  title: string
  audience: string
  date: string
  status: 'published' | 'scheduled' | 'draft'
}

export interface Transaction {
  id: string
  course: string
  amount: number
  date: string
  status: 'completed' | 'pending'
}

export const teacherStats = {
  totalStudents: 2480,
  activeCourses: 6,
  liveClassesToday: 2,
  assignmentsPending: 14,
  totalRevenue: 1847500,
  averageRating: 4.8,
}

export const teacherCourses: TeacherCourse[] = courses.map((c, i) => ({
  id: c.id,
  title: c.title,
  category: c.category,
  students: c.students,
  rating: c.rating,
  completionRate: c.progress ?? [72, 45, 38, 61, 29, 55][i] ?? 50,
  lastUpdated: ['2 days ago', '1 week ago', '3 days ago', '5 days ago', 'Yesterday', '4 days ago'][i],
  status: (['published', 'published', 'draft', 'published', 'archived', 'published'] as CourseStatus[])[i],
  thumbnail: getCourseCoverImage(c),
  image: c.image,
}))

export const teacherStudents: TeacherStudent[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@email.com',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
    progress: 68,
    assignmentsCompleted: 8,
    assignmentsTotal: 12,
    attendance: 92,
    lastActive: '2 hours ago',
    course: 'Full Stack Web Development',
  },
  {
    id: '2',
    name: 'Arjun Mehta',
    email: 'arjun@email.com',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    progress: 45,
    assignmentsCompleted: 5,
    assignmentsTotal: 10,
    attendance: 78,
    lastActive: 'Yesterday',
    course: 'UI/UX Design Masterclass',
  },
  {
    id: '3',
    name: 'Sneha Reddy',
    email: 'sneha@email.com',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    progress: 82,
    assignmentsCompleted: 11,
    assignmentsTotal: 12,
    attendance: 96,
    lastActive: '30 min ago',
    course: 'Mobile App Development',
  },
  {
    id: '4',
    name: 'Rahul Verma',
    email: 'rahul@email.com',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    progress: 34,
    assignmentsCompleted: 3,
    assignmentsTotal: 9,
    attendance: 65,
    lastActive: '3 days ago',
    course: 'Cloud Architecture with AWS',
  },
]

export const liveClasses: LiveClass[] = [
  {
    id: '1',
    title: 'React Hooks Deep Dive',
    course: 'Full Stack Web Development',
    date: '2026-07-07',
    time: '10:00 AM',
    duration: '90 min',
    meetingLink: 'https://meet.lumen.learn/react-hooks',
    status: 'upcoming',
    attendees: 48,
  },
  {
    id: '2',
    title: 'Design Systems Workshop',
    course: 'UI/UX Design Masterclass',
    date: '2026-07-07',
    time: '4:00 PM',
    duration: '60 min',
    meetingLink: 'https://meet.lumen.learn/design-systems',
    status: 'upcoming',
    attendees: 32,
  },
  {
    id: '3',
    title: 'AWS Architecture Q&A',
    course: 'Cloud Architecture with AWS',
    date: '2026-07-03',
    time: '11:00 AM',
    duration: '75 min',
    meetingLink: 'https://meet.lumen.learn/aws-qa',
    status: 'past',
    attendees: 41,
    recording: 'Available',
  },
]

export const assignments: Assignment[] = [
  {
    id: '1',
    title: 'Build a REST API',
    course: 'Full Stack Web Development',
    deadline: 'Jul 12, 2026',
    submissions: 38,
    pending: 6,
    totalMarks: 100,
  },
  {
    id: '2',
    title: 'Figma Prototype',
    course: 'UI/UX Design Masterclass',
    deadline: 'Jul 10, 2026',
    submissions: 29,
    pending: 4,
    totalMarks: 50,
  },
  {
    id: '3',
    title: 'ML Model Evaluation',
    course: 'Machine Learning Fundamentals',
    deadline: 'Jul 15, 2026',
    submissions: 22,
    pending: 4,
    totalMarks: 100,
  },
]

export const messageThreads: MessageThread[] = [
  {
    id: '1',
    student: 'Priya Sharma',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
    preview: 'Could you review my assignment submission?',
    time: '10 min ago',
    unread: true,
  },
  {
    id: '2',
    student: 'Arjun Mehta',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    preview: 'Thanks for the live session yesterday!',
    time: '2 hours ago',
    unread: false,
  },
  {
    id: '3',
    student: 'Sneha Reddy',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    preview: 'When is the next live class scheduled?',
    time: 'Yesterday',
    unread: true,
  },
]

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'New module released: Advanced Hooks',
    audience: 'Full Stack Web Development',
    date: 'Jul 5, 2026',
    status: 'published',
  },
  {
    id: '2',
    title: 'Live class rescheduled to Friday',
    audience: 'UI/UX Design Masterclass',
    date: 'Jul 8, 2026',
    status: 'scheduled',
  },
]

export const transactions: Transaction[] = [
  { id: 'TXN-1042', course: 'Full Stack Web Development', amount: 7499, date: 'Jul 6, 2026', status: 'completed' },
  { id: 'TXN-1041', course: 'UI/UX Design Masterclass', amount: 5799, date: 'Jul 5, 2026', status: 'completed' },
  { id: 'TXN-1040', course: 'Mobile App Development', amount: 6699, date: 'Jul 4, 2026', status: 'pending' },
]

export const chartData = {
  enrollment: [120, 180, 150, 220, 280, 320, 290, 350, 380, 420, 400, 480],
  revenue: [85000, 92000, 78000, 110000, 125000, 140000, 132000, 155000, 168000, 175000, 162000, 184000],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}

export const courseSections = [
  {
    id: 's1',
    title: 'Introduction',
    lessons: [
      { id: 'l1', title: 'Welcome & Overview', type: 'video', locked: false, freePreview: true },
      { id: 'l2', title: 'Course Resources', type: 'pdf', locked: false, freePreview: false },
    ],
  },
  {
    id: 's2',
    title: 'Core Concepts',
    lessons: [
      { id: 'l3', title: 'Fundamentals', type: 'video', locked: true, freePreview: false },
      { id: 'l4', title: 'Practice Notes', type: 'notes', locked: true, freePreview: false },
    ],
  },
]
