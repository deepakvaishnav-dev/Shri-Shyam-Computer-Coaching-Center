import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CreditCard, BookOpen, User, GraduationCap, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../lib/utils';

const navLinks = [
  { to: '/student', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/student/fees', label: 'My Fees', icon: CreditCard },
  { to: '/student/courses', label: 'My Courses', icon: BookOpen },
  { to: '/student/profile', label: 'Profile', icon: User },
];

export function StudentLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      {/* Top Nav */}
      <header className="sticky top-0 z-30 bg-[#1A237E] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF6F00] flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold font-heading text-sm">Student Portal</p>
                <p className="text-xs text-indigo-300">Shri Shyam Center</p>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'text-indigo-200 hover:bg-white/10 hover:text-white'
                    )
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* User + Logout */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-white text-sm font-semibold">{user?.name}</p>
                <p className="text-indigo-300 text-xs">Student</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#FF6F00] flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0) || 'S'}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-indigo-200 hover:bg-white/10 hover:text-white transition-all text-sm"
                title="Logout"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="md:hidden sticky top-16 z-20 bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="flex overflow-x-auto px-4 gap-1 py-2">
          {navLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all',
                  isActive
                    ? 'bg-[#E8EAF6] text-[#1A237E]'
                    : 'text-[#374151] hover:bg-[#F3F4F6]'
                )
              }
            >
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Page Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}
