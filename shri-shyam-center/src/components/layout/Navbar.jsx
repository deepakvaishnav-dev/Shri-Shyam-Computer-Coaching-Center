import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, LogIn } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../lib/utils';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, role, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1A237E] flex items-center justify-center shadow-md group-hover:bg-[#FF6F00] transition-colors duration-300 shrink-0">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-[#1A237E] leading-tight font-heading truncate">Shri Shyam</p>
              <p className="text-[10px] sm:text-xs text-[#6B7280] leading-tight truncate">Computer & Coaching Center</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-[#E8EAF6] text-[#1A237E]'
                      : 'text-[#374151] hover:bg-[#F3F4F6] hover:text-[#1A237E]'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to={role === 'admin' ? '/admin' : '/student'}
                  className="px-4 py-2 text-sm font-semibold text-[#1A237E] border-2 border-[#1A237E] rounded-lg hover:bg-[#E8EAF6] transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-semibold text-white bg-[#C62828] rounded-lg hover:bg-[#B71C1C] transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/contact"
                  className="px-4 py-2 text-sm font-semibold text-[#1A237E] border-2 border-[#1A237E] rounded-lg hover:bg-[#E8EAF6] transition-colors"
                >
                  Enroll Now
                </Link>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#1A237E] rounded-lg hover:bg-[#0D1453] transition-colors"
                >
                  <LogIn size={16} />
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-[#374151] hover:bg-[#F3F4F6] transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E7EB] px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive ? 'bg-[#E8EAF6] text-[#1A237E]' : 'text-[#374151] hover:bg-[#F3F4F6]'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#E5E7EB] mt-2">
            {isAuthenticated ? (
              <>
                <Link
                  to={role === 'admin' ? '/admin' : '/student'}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-semibold text-center text-[#1A237E] border-2 border-[#1A237E] rounded-lg"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="px-4 py-3 text-sm font-semibold text-white bg-[#C62828] rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-semibold text-center text-[#1A237E] border-2 border-[#1A237E] rounded-lg"
                >
                  Enroll Now
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#1A237E] rounded-lg"
                >
                  <LogIn size={16} />
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
