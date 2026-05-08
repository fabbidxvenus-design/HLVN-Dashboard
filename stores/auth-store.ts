import { create } from 'zustand';
import type { AuthSession } from '@/types/auth';
import type { UserProfile } from '@/types/user';
import { getStoredSession, setStoredSession, clearStoredSession } from '@/lib/auth/token-store';

interface AuthStoreState {
  user: UserProfile | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  accessToken: null,
  isLoading: true,
  error: null,

  setSession: (session: AuthSession) => {
    setStoredSession(session);
    set({ user: session.user, accessToken: session.accessToken, error: null });
  },

  clearSession: () => {
    clearStoredSession();
    set({ user: null, accessToken: null, error: null });
  },

  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  setError: (error: string | null) => set({ error }),
}));

// Initialize from localStorage on first load (client-side only)
if (typeof window !== 'undefined') {
  const stored = getStoredSession();
  if (stored) {
    useAuthStore.setState({ user: stored.user, accessToken: stored.accessToken });
  }
}