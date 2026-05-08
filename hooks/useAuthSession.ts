'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { auth } from '@/lib/api/endpoints';
import { ApiError } from '@/types/api';
import type { UserProfile } from '@/types/user';

export interface AuthState {
  user: UserProfile | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  refetch: () => Promise<void>;
}

export function useAuthSession(): AuthState {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);
  const setIsLoading = useAuthStore((s) => s.setIsLoading);
  const setError = useAuthStore((s) => s.setError);

  const validateSession = useCallback(async () => {
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await auth.me();
      if (response.success) {
        setSession({ accessToken, user: response.data });
        if (response.data.role !== 'admin') {
          setError('Tài khoản không có quyền truy cập dashboard.');
          clearSession();
          router.push('/login');
          return;
        }
      } else {
        clearSession();
        router.push('/login');
      }
    } catch (err) {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearSession();
        router.push('/login');
      } else {
        setError('Không thể xác thực phiên đăng nhập. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, setSession, clearSession, setIsLoading, setError, router]);

  useEffect(() => {
    if (accessToken && !user) {
      validateSession();
    } else if (!accessToken) {
      setIsLoading(false);
    }
  }, [accessToken, user, validateSession, setIsLoading]);

  return {
    user,
    accessToken,
    isLoading,
    error,
    isAuthenticated: !!accessToken && !!user && user.role === 'admin',
    refetch: validateSession,
  };
}