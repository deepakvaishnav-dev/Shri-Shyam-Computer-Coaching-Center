import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, CreditCard, BookOpen,
  Bell, Settings, GraduationCap, LogOut, Menu, ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../lib/utils';

const sidebarLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/students', label: 'Students', icon: Users },
  { to: '/admin/fees', label: 'Fee Management', icon: CreditCard },
  { to: '/admin/courses', label: 'Courses', icon: BookOpen },
  { to: '/admin/notices', label: 'Notices', icon: Bell },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

// ─── Sidebar (declared outside to avoid "created during render" error) ───
function AdminSidebar({ collapsed, mobile, onClose, user, onLogout }) {
  return (
    <aside
      className={cn(
        'flex flex-col bg-[#0D1453] h-full transition-all duration-300',
        mobile ? 'w-72' : collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-[#FF6F00] flex items-center justify-center shrink-0">
          <GraduationCap size={22} className="text-white" />
        </div>
        {(!collapsed || mobile) && (
          <div>
            <p className="text-white font-bold font-heading text-sm leading-tight">Shri Shyam</p>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              cn('sidebar-item', isActive && 'active')
            }
          >
            <Icon size={18} className="shrink-0" />
            {(!collapsed || mobile) && <span>{label}</span>}
            {(!collapsed || mobile) && <ChevronRight size={14} className="ml-auto opacity-30" />}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 px-3 py-4">
        <div className={cn('flex items-center gap-3 px-2 py-2 mb-2', collapsed && !mobile && 'justify-center')}>
          <div className="w-9 h-9 rounded-full bg-[#FF6F00] flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user?.name?.charAt(0) || 'A'}
          </div>
          {(!collapsed || mobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="text-gray-400 text-xs">Administrator</p>
            </div>
          )}
        </div>
        <button
          onClick={onLogout}
          className={cn(
            'sidebar-item w-full text-[#F87171] hover:bg-red-500/10',
            collapsed && !mobile && 'justify-center'
          )}
        >
          <LogOut size={18} className="shrink-0" />
          {(!collapsed || mobile) && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F3F4F6]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
        <AdminSidebar
          collapsed={collapsed}
          mobile={false}
          onClose={undefined}
          user={user}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <AdminSidebar
            collapsed={false}
            mobile
            onClose={() => setMobileOpen(false)}
            user={user}
            onLogout={handleLogout}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-[#E5E7EB] px-4 sm:px-6 h-16 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="hidden md:flex p-2 rounded-lg hover:bg-[#F3F4F6] text-[#374151] transition-colors"
              onClick={() => setCollapsed((c) => !c)}
            >
              <Menu size={20} />
            </button>
            <button
              className="flex md:hidden p-2 rounded-lg hover:bg-[#F3F4F6] text-[#374151] transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-bold text-[#111827] font-heading">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-[#111827]">{user?.name}</p>
              <p className="text-xs text-[#9CA3AF]">Administrator</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#1A237E] flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
