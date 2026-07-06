export interface Lesson {
  id: string
  title: string
  duration: string
  completed: boolean
}

export interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  instructorAvatar: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  lessons: number
  rating: number
  students: number
  price: number
  image: string
  coverImage?: string
  progress?: number
  enrolled?: boolean
  modules: Module[]
  tags: string[]
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    description:
      'Master modern web development with React, Node.js, and TypeScript. Build production-ready applications from scratch.',
    instructor: 'Dr. Sarah Chen',
    instructorAvatar: 'SC',
    category: 'Development',
    level: 'Intermediate',
    duration: '42 hours',
    lessons: 86,
    rating: 4.9,
    students: 12450,
    price: 7499,
    image: 'from-accent-primary to-highlight',
    coverImage:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80',
    progress: 68,
    enrolled: true,
    tags: ['React', 'TypeScript', 'Node.js'],
    modules: [
      {
        id: 'm1',
        title: 'Getting Started',
        lessons: [
          { id: 'l1', title: 'Course Introduction', duration: '8:24', completed: true },
          { id: 'l2', title: 'Setting Up Your Environment', duration: '15:30', completed: true },
          { id: 'l3', title: 'Project Overview', duration: '12:15', completed: true },
        ],
      },
      {
        id: 'm2',
        title: 'React Fundamentals',
        lessons: [
          { id: 'l4', title: 'Components & Props', duration: '22:40', completed: true },
          { id: 'l5', title: 'State & Hooks', duration: '28:15', completed: true },
          { id: 'l6', title: 'Context API', duration: '19:50', completed: false },
        ],
      },
      {
        id: 'm3',
        title: 'Backend with Node.js',
        lessons: [
          { id: 'l7', title: 'Express Setup', duration: '18:30', completed: false },
          { id: 'l8', title: 'REST API Design', duration: '25:00', completed: false },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'UI/UX Design Masterclass',
    description:
      'Learn design thinking, prototyping, and creating beautiful user experiences that delight users.',
    instructor: 'Marcus Rivera',
    instructorAvatar: 'MR',
    category: 'Design',
    level: 'Beginner',
    duration: '28 hours',
    lessons: 54,
    rating: 4.8,
    students: 8920,
    price: 5799,
    image: 'from-highlight to-accent-secondary',
    coverImage:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=80',
    progress: 35,
    enrolled: true,
    tags: ['Figma', 'Design Systems', 'Prototyping'],
    modules: [
      {
        id: 'm1',
        title: 'Design Foundations',
        lessons: [
          { id: 'l1', title: 'Introduction to UX', duration: '14:20', completed: true },
          { id: 'l2', title: 'Color Theory', duration: '18:45', completed: false },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Machine Learning Fundamentals',
    description:
      'Dive into AI and machine learning with Python. From linear regression to neural networks.',
    instructor: 'Prof. James Okonkwo',
    instructorAvatar: 'JO',
    category: 'Data Science',
    level: 'Advanced',
    duration: '56 hours',
    lessons: 112,
    rating: 4.9,
    students: 6780,
    price: 8299,
    image: 'from-accent-secondary to-accent-primary',
    coverImage:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80',
    enrolled: false,
    tags: ['Python', 'TensorFlow', 'AI'],
    modules: [
      {
        id: 'm1',
        title: 'Introduction to ML',
        lessons: [
          { id: 'l1', title: 'What is Machine Learning?', duration: '16:00', completed: false },
          { id: 'l2', title: 'Python for Data Science', duration: '24:30', completed: false },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'Digital Marketing Strategy',
    description:
      'Build comprehensive marketing campaigns across social media, SEO, and content marketing.',
    instructor: 'Elena Vasquez',
    instructorAvatar: 'EV',
    category: 'Marketing',
    level: 'Beginner',
    duration: '24 hours',
    lessons: 48,
    rating: 4.7,
    students: 15300,
    price: 4999,
    image: 'from-accent-primary to-accent-secondary',
    coverImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
    enrolled: false,
    tags: ['SEO', 'Social Media', 'Analytics'],
    modules: [
      {
        id: 'm1',
        title: 'Marketing Basics',
        lessons: [
          { id: 'l1', title: 'Digital Landscape Overview', duration: '12:00', completed: false },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'Cloud Architecture with AWS',
    description:
      'Design scalable, secure cloud infrastructure using AWS services and best practices.',
    instructor: 'David Kim',
    instructorAvatar: 'DK',
    category: 'Cloud',
    level: 'Advanced',
    duration: '38 hours',
    lessons: 72,
    rating: 4.8,
    students: 5420,
    price: 7899,
    image: 'from-highlight to-accent-primary',
    coverImage:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
    enrolled: false,
    tags: ['AWS', 'DevOps', 'Kubernetes'],
    modules: [
      {
        id: 'm1',
        title: 'AWS Fundamentals',
        lessons: [
          { id: 'l1', title: 'Cloud Computing Basics', duration: '20:00', completed: false },
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'Mobile App Development',
    description:
      'Create stunning cross-platform mobile apps with React Native and modern tooling.',
    instructor: 'Dr. Sarah Chen',
    instructorAvatar: 'SC',
    category: 'Development',
    level: 'Intermediate',
    duration: '36 hours',
    lessons: 68,
    rating: 4.8,
    students: 9870,
    price: 6699,
    image: 'from-accent-secondary to-highlight',
    coverImage:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=80',
    progress: 12,
    enrolled: true,
    tags: ['React Native', 'Mobile', 'iOS'],
    modules: [
      {
        id: 'm1',
        title: 'React Native Basics',
        lessons: [
          { id: 'l1', title: 'Getting Started', duration: '15:00', completed: true },
          { id: 'l2', title: 'Navigation', duration: '22:00', completed: false },
        ],
      },
    ],
  },
]

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id)
}

export function getEnrolledCourses(): Course[] {
  return courses.filter((c) => c.enrolled)
}

export const stats = {
  totalStudents: 180000,
  totalCourses: 320,
  totalInstructors: 85,
  satisfactionRate: 4.9,
}

export const testimonials = [
  {
    id: '1',
    name: 'Alexandra Park',
    role: 'Software Engineer at Google',
    avatar: 'AP',
    photo:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    content:
      'Lumens transformed my career. The courses are incredibly well-structured and the instructors are world-class.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Torres',
    role: 'Product Designer at Figma',
    avatar: 'MT',
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content:
      'The design courses here rival anything I learned in my masters program. Absolutely premium quality.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'Data Scientist at Meta',
    avatar: 'PS',
    photo:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    content:
      'From beginner to landing my dream job in 6 months. Lumens made it possible with their ML track.',
    rating: 5,
  },
]
