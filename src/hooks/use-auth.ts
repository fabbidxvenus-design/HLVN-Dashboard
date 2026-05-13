import { useAuthStore } from '../stores/auth-store'

export const useAuth = () => {
  const store = useAuthStore()
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    login: store.login,
    logout: store.logout,
    loadSession: store.loadSession,
  }
}