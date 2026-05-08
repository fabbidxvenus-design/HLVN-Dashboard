import type { UserProfile } from '@/types/user';

export function isAdmin(user: UserProfile | null): boolean {
  return user?.role === 'admin';
}

export function isAuthenticated(accessToken: string | null): boolean {
  return !!accessToken;
}