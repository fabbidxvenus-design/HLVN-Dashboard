import { auth as authEndpoints, users as usersEndpoints, scans as scansEndpoints } from './endpoints';
import type { UserProfile, UserRole } from '@/types/user';
import type { AuthSession } from '@/types/auth';
import type { ApiResponse } from '@/types/api';

// Re-export for convenience
export { auth } from './endpoints';
export { users } from './endpoints';
export { scans } from './endpoints';
export { analytics } from './endpoints';
export { exportApi } from './endpoints';

// Type-safe wrappers for users with mock support
export const usersApi = {
  list: (params?: { page?: number; limit?: number; search?: string; role?: string; sortBy?: string; sortOrder?: string }) =>
    usersEndpoints.list(params),

  create: (data: { email: string; password: string; role: UserRole }) =>
    usersEndpoints.create(data),

  updateRole: (id: string, role: UserRole) =>
    usersEndpoints.updateRole(id, role),

  delete: (id: string) =>
    usersEndpoints.delete(id),
};