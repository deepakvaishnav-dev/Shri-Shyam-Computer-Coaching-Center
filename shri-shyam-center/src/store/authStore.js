import { create } from 'zustand';
import { db } from '../lib/db';

const SESSION_KEY = 'ssc_session';

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const useAuthStore = create((set) => ({
  user: loadSession()?.user || null,
  role: loadSession()?.role || null,
  studentId: loadSession()?.studentId || null,
  isAuthenticated: !!loadSession(),

  login: (email, password) => {
    const user = db.users.getByEmail(email);
    if (!user || user.password !== password) {
      return { success: false, message: 'Invalid email or password' };
    }
    const session = {
      user: { id: user.id, name: user.name, email: user.email },
      role: user.role,
      studentId: user.studentId || null,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    set({ ...session, isAuthenticated: true });
    return { success: true, role: user.role };
  },

  logout: () => {
    sessionStorage.removeItem(SESSION_KEY);
    set({ user: null, role: null, studentId: null, isAuthenticated: false });
  },
}));
