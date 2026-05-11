import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AdminRoute, StudentRoute } from '../components/layout/ProtectedRoute';
import { AdminLayout } from '../components/layout/AdminLayout';
import { StudentLayout } from '../components/layout/StudentLayout';

// Public Pages
import Home from '../pages/public/Home';
import Courses from '../pages/public/Courses';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';

// Auth
import Login from '../pages/auth/Login';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import Students from '../pages/admin/Students';
import Fees from '../pages/admin/Fees';
import CoursesAdmin from '../pages/admin/Courses';
import Notices from '../pages/admin/Notices';
import Settings from '../pages/admin/Settings';

// Student Pages
import StudentDashboard from '../pages/student/Dashboard';
import MyFees from '../pages/student/MyFees';
import MyCourses from '../pages/student/MyCourses';
import Profile from '../pages/student/Profile';

const router = createBrowserRouter([
  // Public Routes
  { path: '/', element: <Home /> },
  { path: '/courses', element: <Courses /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/login', element: <Login /> },

  // Admin Routes
  {
    path: '/admin',
    element: <AdminRoute><AdminLayout /></AdminRoute>,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'students', element: <Students /> },
      { path: 'fees', element: <Fees /> },
      { path: 'courses', element: <CoursesAdmin /> },
      { path: 'notices', element: <Notices /> },
      { path: 'settings', element: <Settings /> },
    ],
  },

  // Student Routes
  {
    path: '/student',
    element: <StudentRoute><StudentLayout /></StudentRoute>,
    children: [
      { index: true, element: <StudentDashboard /> },
      { path: 'fees', element: <MyFees /> },
      { path: 'courses', element: <MyCourses /> },
      { path: 'profile', element: <Profile /> },
    ],
  },

  // 404
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
