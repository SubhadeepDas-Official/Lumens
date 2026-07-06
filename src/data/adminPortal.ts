import { courses } from '@/data/courses'
import { getCourseCoverImage } from '@/lib/courseImages'

export type StudentStatus = 'active' | 'suspended'
export type TeacherStatus = 'approved' | 'pending' | 'rejected'
export type CoursePublishStatus = 'published' | 'draft' | 'archived'
export type RefundStatus = 'pending' | 'approved' | 'rejected'

export interface AdminStudent {
  id: string
  name: string
  email: string
  photo: string
  enrolledCourses: number
  progress: number
  status: StudentStatus
  joined: string
  lastActive: string
}

export interface AdminTeacher {
  id: string
  name: string
  email: string
  photo: string
  expertise: string
  courses: number
  students: number
  rating: number
  status: TeacherStatus
  joined: string
}

export interface AdminCourse {
  id: string
  title: string
  category: string
  teacher: string
  students: number
  revenue: number
  rating: number
  status: CoursePublishStatus
  thumbnail: string
  lastUpdated: string
}

export interface AdminTransaction {
  id: string
  student: string
  course: string
  amount: number
  date: string
  method: string
  status: 'completed' | 'pending' | 'refunded'
}

export interface RefundRequest {
  id: string
  student: string
  course: string
  amount: number
  reason: string
  date: string
  status: RefundStatus
}

export interface AdminLiveClass {
  id: string
  title: string
  course: string
  teacher: string
  date: string
  time: string
  duration: string
  attendees: number
  status: 'upcoming' | 'completed' | 'cancelled'
}

export interface AdminAnnouncement {
  id: string
  title: string
  audience: string
  author: string
  date: string
  status: 'published' | 'scheduled' | 'draft'
}

export interface RecentActivity {
  id: string
  action: string
  user: string
  time: string
  type: 'enrollment' | 'payment' | 'course' | 'teacher' | 'system'
}

export const adminStats = {
  totalStudents: 12480,
  totalTeachers: 186,
  totalCourses: 48,
  totalRevenue: 28475000,
  activeUsers: 3420,
  pendingApprovals: 12,
}

export const adminStudents: AdminStudent[] = [
  {
    id: 's1',
    name: 'Priya Sharma',
    email: 'priya@email.com',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
    enrolledCourses: 3,
    progress: 68,
    status: 'active',
    joined: 'Jan 12, 2026',
    lastActive: '2 hours ago',
  },
  {
    id: 's2',
    name: 'Arjun Mehta',
    email: 'arjun@email.com',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    enrolledCourses: 2,
    progress: 45,
    status: 'active',
    joined: 'Feb 3, 2026',
    lastActive: 'Yesterday',
  },
  {
    id: 's3',
    name: 'Sneha Reddy',
    email: 'sneha@email.com',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    enrolledCourses: 4,
    progress: 82,
    status: 'active',
    joined: 'Dec 20, 2025',
    lastActive: '30 min ago',
  },
  {
    id: 's4',
    name: 'Rahul Verma',
    email: 'rahul@email.com',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    enrolledCourses: 1,
    progress: 34,
    status: 'suspended',
    joined: 'Mar 8, 2026',
    lastActive: '3 days ago',
  },
  {
    id: 's5',
    name: 'Ananya Patel',
    email: 'ananya@email.com',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    enrolledCourses: 2,
    progress: 56,
    status: 'active',
    joined: 'Apr 1, 2026',
    lastActive: '5 hours ago',
  },
]

export const adminTeachers: AdminTeacher[] = [
  {
    id: 't1',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh@lumen.learn',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80',
    expertise: 'Full Stack Development',
    courses: 4,
    students: 1240,
    rating: 4.9,
    status: 'approved',
    joined: 'Aug 2024',
  },
  {
    id: 't2',
    name: 'Meera Iyer',
    email: 'meera@lumen.learn',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    expertise: 'UI/UX Design',
    courses: 3,
    students: 890,
    rating: 4.8,
    status: 'approved',
    joined: 'Oct 2024',
  },
  {
    id: 't3',
    name: 'Vikram Singh',
    email: 'vikram@email.com',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80',
    expertise: 'Cloud Architecture',
    courses: 0,
    students: 0,
    rating: 0,
    status: 'pending',
    joined: 'Jul 5, 2026',
  },
  {
    id: 't4',
    name: 'Kavita Nair',
    email: 'kavita@email.com',
    photo: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=100&q=80',
    expertise: 'Data Science',
    courses: 0,
    students: 0,
    rating: 0,
    status: 'pending',
    joined: 'Jul 6, 2026',
  },
]

const teacherNames = ['Dr. Rajesh Kumar', 'Meera Iyer', 'Dr. Rajesh Kumar', 'Meera Iyer', 'Dr. Rajesh Kumar', 'Meera Iyer']

export const adminCourses: AdminCourse[] = courses.map((c, i) => ({
  id: c.id,
  title: c.title,
  category: c.category,
  teacher: teacherNames[i] ?? 'Dr. Rajesh Kumar',
  students: c.students,
  revenue: c.price * (c.students ?? 100),
  rating: c.rating,
  status: (['published', 'published', 'draft', 'published', 'archived', 'published'] as CoursePublishStatus[])[i],
  thumbnail: getCourseCoverImage(c),
  lastUpdated: ['2 days ago', '1 week ago', '3 days ago', '5 days ago', 'Yesterday', '4 days ago'][i],
}))

export const adminTransactions: AdminTransaction[] = [
  { id: 'TXN-2042', student: 'Priya Sharma', course: 'Full Stack Web Development', amount: 7499, date: 'Jul 6, 2026', method: 'UPI', status: 'completed' },
  { id: 'TXN-2041', student: 'Arjun Mehta', course: 'UI/UX Design Masterclass', amount: 5799, date: 'Jul 5, 2026', method: 'Card', status: 'completed' },
  { id: 'TXN-2040', student: 'Sneha Reddy', course: 'Mobile App Development', amount: 6699, date: 'Jul 4, 2026', method: 'Net Banking', status: 'pending' },
  { id: 'TXN-2039', student: 'Ananya Patel', course: 'Cloud Architecture with AWS', amount: 8999, date: 'Jul 3, 2026', method: 'UPI', status: 'completed' },
  { id: 'TXN-2038', student: 'Rahul Verma', course: 'Machine Learning Fundamentals', amount: 9999, date: 'Jul 2, 2026', method: 'Card', status: 'refunded' },
]

export const refundRequests: RefundRequest[] = [
  { id: 'REF-101', student: 'Rahul Verma', course: 'Machine Learning Fundamentals', amount: 9999, reason: 'Course not as expected', date: 'Jul 3, 2026', status: 'pending' },
  { id: 'REF-100', student: 'Karan Joshi', course: 'UI/UX Design Masterclass', amount: 5799, reason: 'Duplicate purchase', date: 'Jul 1, 2026', status: 'approved' },
]

export const adminLiveClasses: AdminLiveClass[] = [
  { id: 'lc1', title: 'React Hooks Deep Dive', course: 'Full Stack Web Development', teacher: 'Dr. Rajesh Kumar', date: 'Jul 7, 2026', time: '10:00 AM', duration: '90 min', attendees: 48, status: 'upcoming' },
  { id: 'lc2', title: 'Design Systems Workshop', course: 'UI/UX Design Masterclass', teacher: 'Meera Iyer', date: 'Jul 7, 2026', time: '4:00 PM', duration: '60 min', attendees: 32, status: 'upcoming' },
  { id: 'lc3', title: 'AWS Architecture Q&A', course: 'Cloud Architecture with AWS', teacher: 'Dr. Rajesh Kumar', date: 'Jul 3, 2026', time: '11:00 AM', duration: '75 min', attendees: 41, status: 'completed' },
  { id: 'lc4', title: 'Flutter State Management', course: 'Mobile App Development', teacher: 'Meera Iyer', date: 'Jun 28, 2026', time: '3:00 PM', duration: '60 min', attendees: 28, status: 'completed' },
]

export const adminAnnouncements: AdminAnnouncement[] = [
  { id: 'a1', title: 'Platform maintenance scheduled', audience: 'All Users', author: 'Admin', date: 'Jul 6, 2026', status: 'published' },
  { id: 'a2', title: 'New courses launching this month', audience: 'All Students', author: 'Admin', date: 'Jul 8, 2026', status: 'scheduled' },
  { id: 'a3', title: 'Teacher onboarding guidelines', audience: 'All Teachers', author: 'Admin', date: 'Jul 4, 2026', status: 'published' },
]

export const recentActivities: RecentActivity[] = [
  { id: '1', action: 'enrolled in Full Stack Web Development', user: 'Priya Sharma', time: '10 min ago', type: 'enrollment' },
  { id: '2', action: 'completed payment of ₹7,499', user: 'Arjun Mehta', time: '25 min ago', type: 'payment' },
  { id: '3', action: 'submitted teacher application', user: 'Vikram Singh', time: '1 hour ago', type: 'teacher' },
  { id: '4', action: 'published new course module', user: 'Dr. Rajesh Kumar', time: '2 hours ago', type: 'course' },
  { id: '5', action: 'requested refund for ML course', user: 'Rahul Verma', time: '3 hours ago', type: 'payment' },
  { id: '6', action: 'completed UI/UX Design Masterclass', user: 'Sneha Reddy', time: '5 hours ago', type: 'enrollment' },
]

export const adminChartData = {
  enrollment: [420, 480, 510, 580, 620, 680, 720, 780, 820, 890, 940, 1020],
  revenue: [18.5, 20.2, 19.8, 22.4, 24.1, 25.8, 26.5, 27.2, 28.0, 28.4, 27.9, 28.5],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  coursePopularity: [
    { name: 'Full Stack Web Dev', value: 92 },
    { name: 'UI/UX Design', value: 78 },
    { name: 'Mobile App Dev', value: 65 },
    { name: 'Cloud AWS', value: 58 },
    { name: 'Machine Learning', value: 52 },
  ],
  teacherPerformance: [
    { name: 'Dr. Rajesh Kumar', rating: 4.9, students: 1240 },
    { name: 'Meera Iyer', rating: 4.8, students: 890 },
    { name: 'Amit Desai', rating: 4.7, students: 620 },
    { name: 'Sunita Rao', rating: 4.6, students: 480 },
  ],
  engagement: [72, 68, 75, 80, 78, 82, 85, 83, 88, 86, 90, 92],
}
