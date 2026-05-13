import { create } from 'zustand'
import { api } from '../lib/api'
import { mapUser, type BackendUser } from '../lib/api-adapters'
import type { UserProfile } from '../types/user'

interface AuthState {
  user: UserProfile | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loadSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const res = await api.post<{
        user: UserProfile
        accessToken: string
        refreshToken: string
      }>('/auth/login', { email, password, audience: 'dashboard' })

      if (!res.success || !res.data) {
        set({ error: res.error || 'Login failed', isLoading: false })
        return
      }

      localStorage.setItem('accessToken', res.data.accessToken)
      localStorage.setItem('refreshToken', res.data.refreshToken)

      set({
        user: res.data.user,
        accessToken: res.data.accessToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
    } catch {
      set({ error: 'Network error', isLoading: false })
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    set({ user: null, accessToken: null, isAuthenticated: false })
  },

  loadSession: async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false })
      return
    }

    set({ isLoading: true })

    try {
      const res = await api.get<BackendUser | { user: BackendUser }>('/auth/me')
      if (!res.success || !res.data) {
        set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false })
        return
      }

      const rawUser = 'user' in res.data ? res.data.user : res.data
      const currentToken = localStorage.getItem('accessToken')
      if (!currentToken) {
        set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false })
        return
      }

      set({
        user: mapUser(rawUser),
        accessToken: currentToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
    } catch {
      set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false })
    }
  },
}))