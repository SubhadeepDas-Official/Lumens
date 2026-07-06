import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from '@/context/AuthContext'
import {
  ProtectedRoute,
  PublicOnlyRoute,
  DashboardRedirect,
  RoleSelectionRoute,
} from '@/components/ProtectedRoute'
import { PublicLayout, AuthLayout, CatalogLayout } from '@/components/layout/AppLayout'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { StudentLayout } from '@/components/student/StudentLayout'
import { TeacherLayout } from '@/components/teacher/TeacherLayout'

import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import VerifyEmailPage from '@/pages/VerifyEmailPage'
import SelectRolePage from '@/pages/SelectRolePage'
import CourseDetailsPage from '@/pages/CourseDetailsPage'
import PurchaseCoursesPage from '@/pages/PurchaseCoursesPage'

import StudentDashboardPage from '@/pages/student/StudentDashboardPage'
import StudentCoursesPage from '@/pages/student/StudentCoursesPage'
import StudentCourseDetailsPage from '@/pages/student/StudentCourseDetailsPage'
import StudentVideoPage from '@/pages/student/StudentVideoPage'
import StudentLiveClassesPage from '@/pages/student/StudentLiveClassesPage'
import StudentAssignmentsPage from '@/pages/student/StudentAssignmentsPage'
import StudentCertificatesPage from '@/pages/student/StudentCertificatesPage'
import StudentPurchasesPage from '@/pages/student/StudentPurchasesPage'
import StudentProfilePage from '@/pages/student/StudentProfilePage'
import StudentSettingsPage from '@/pages/student/StudentSettingsPage'

import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'

import AdminStudentsPage from '@/pages/admin/AdminStudentsPage'
import AdminTeachersPage from '@/pages/admin/AdminTeachersPage'
import AdminCoursesPage from '@/pages/admin/AdminCoursesPage'
import AdminPaymentsPage from '@/pages/admin/AdminPaymentsPage'
import AdminLiveClassesPage from '@/pages/admin/AdminLiveClassesPage'
import AdminAnnouncementsPage from '@/pages/admin/AdminAnnouncementsPage'
import AdminAnalyticsPage from '@/pages/admin/AdminAnalyticsPage'
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage'

import TeacherDashboardPage from '@/pages/teacher/TeacherDashboardPage'
import TeacherCoursesPage from '@/pages/teacher/TeacherCoursesPage'
import CreateCoursePage from '@/pages/teacher/CreateCoursePage'
import CourseContentPage from '@/pages/teacher/CourseContentPage'
import LiveClassesPage from '@/pages/teacher/LiveClassesPage'
import AssignmentsPage from '@/pages/teacher/AssignmentsPage'
import StudentsPage from '@/pages/teacher/StudentsPage'
import AttendancePage from '@/pages/teacher/AttendancePage'
import MessagesPage from '@/pages/teacher/MessagesPage'
import AnnouncementsPage from '@/pages/teacher/AnnouncementsPage'
import AnalyticsPage from '@/pages/teacher/AnalyticsPage'
import EarningsPage from '@/pages/teacher/EarningsPage'
import TeacherProfilePage from '@/pages/teacher/TeacherProfilePage'
import TeacherSettingsPage from '@/pages/teacher/TeacherSettingsPage'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/purchase" element={<Navigate to="/catalog" replace />} />
        </Route>

        <Route element={<CatalogLayout />}>
          <Route path="/catalog" element={<PurchaseCoursesPage />} />
          <Route path="/catalog/:id" element={<CourseDetailsPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicOnlyRoute>
                <SignupPage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicOnlyRoute>
                <ForgotPasswordPage />
              </PublicOnlyRoute>
            }
          />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route
            path="/select-role"
            element={
              <RoleSelectionRoute>
                <SelectRolePage />
              </RoleSelectionRoute>
            }
          />
        </Route>

        <Route path="/dashboard" element={<DashboardRedirect />} />

        <Route
          element={
            <ProtectedRoute roles={['student']}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/student/dashboard" element={<StudentDashboardPage />} />
          <Route path="/student/courses" element={<StudentCoursesPage />} />
          <Route path="/student/courses/:courseId" element={<StudentCourseDetailsPage />} />
          <Route path="/student/courses/:courseId/learn/:lessonId" element={<StudentVideoPage />} />
          <Route path="/student/live-classes" element={<StudentLiveClassesPage />} />
          <Route path="/student/assignments" element={<StudentAssignmentsPage />} />
          <Route path="/student/certificates" element={<StudentCertificatesPage />} />
          <Route path="/student/purchases" element={<StudentPurchasesPage />} />
          <Route path="/student/profile" element={<StudentProfilePage />} />
          <Route path="/student/settings" element={<StudentSettingsPage />} />
          <Route path="/courses" element={<StudentCoursesPage />} />
          <Route path="/courses/:courseId/learn/:lessonId" element={<StudentVideoPage />} />
          <Route path="/profile" element={<StudentProfilePage />} />
          <Route path="/settings" element={<StudentSettingsPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute roles={['teacher']}>
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/teacher/dashboard" element={<TeacherDashboardPage />} />
          <Route path="/teacher/courses" element={<TeacherCoursesPage />} />
          <Route path="/teacher/courses/create" element={<CreateCoursePage />} />
          <Route path="/teacher/content" element={<CourseContentPage />} />
          <Route path="/teacher/live-classes" element={<LiveClassesPage />} />
          <Route path="/teacher/assignments" element={<AssignmentsPage />} />
          <Route path="/teacher/students" element={<StudentsPage />} />
          <Route path="/teacher/attendance" element={<AttendancePage />} />
          <Route path="/teacher/messages" element={<MessagesPage />} />
          <Route path="/teacher/announcements" element={<AnnouncementsPage />} />
          <Route path="/teacher/analytics" element={<AnalyticsPage />} />
          <Route path="/teacher/earnings" element={<EarningsPage />} />
          <Route path="/teacher/profile" element={<TeacherProfilePage />} />
          <Route path="/teacher/settings" element={<TeacherSettingsPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/students" element={<AdminStudentsPage />} />
          <Route path="/admin/teachers" element={<AdminTeachersPage />} />
          <Route path="/admin/courses" element={<AdminCoursesPage />} />
          <Route path="/admin/payments" element={<AdminPaymentsPage />} />
          <Route path="/admin/live-classes" element={<AdminLiveClassesPage />} />
          <Route path="/admin/announcements" element={<AdminAnnouncementsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimatedRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
