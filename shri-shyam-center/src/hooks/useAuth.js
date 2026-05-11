import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const { user, role, studentId, isAuthenticated, login, logout } = useAuthStore();
  return { user, role, studentId, isAuthenticated, login, logout };
}
