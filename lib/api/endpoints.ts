import { apiClient } from './client';
import type { UserRole, UserProfile } from '@/types/user';
import type { AuthSession } from '@/types/auth';

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export const auth = {
  login: (email: string, password: string) =>
    apiClient.post<AuthSession>('/api/auth/login', { email, password }),

  me: () => apiClient.get<UserProfile>('/api/auth/me'),

  logout: () => apiClient.post<{ message: string }>('/api/auth/logout'),
};

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export const users = {
  list: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    sortBy?: string;
    sortOrder?: string;
  }) =>
    apiClient.get<UserProfile[]>('/api/users', params),

  create: (data: { email: string; role: UserRole }) =>
    apiClient.post<UserProfile>('/api/users', data),

  updateRole: (id: string, role: UserRole) =>
    apiClient.patch<UserProfile>(`/api/users/${id}/role`, { role }),

  delete: (id: string) =>
    apiClient.delete<{ message: string }>(`/api/users/${id}`),
};

// ---------------------------------------------------------------------------
// Scans
// ---------------------------------------------------------------------------

// Re-export ScanRecord from types for use in API endpoints
export type { ScanRecord } from '@/types/scan'

import type { ScanRecord } from '@/types/scan'

export const scans = {
  list: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    userId?: string;
    dateFrom?: string;
    dateTo?: string;
    sortBy?: string;
    sortOrder?: string;
  }) =>
    apiClient.get<ScanRecord[]>('/api/scans', params),

  detail: (id: string) =>
    apiClient.get<{ scan: ScanRecord; user: { id: string; email: string } }>(`/api/scans/${id}`),

  delete: (id: string) =>
    apiClient.delete<{ message: string }>(`/api/scans/${id}`),
};

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------

export interface AnalyticsSummary {
  totalScans: number;
  activeUsers: number;
  totalTokenUsage: number;
  successRate: number;
  averageTokensPerScan: number;
  scansThisWeek: number;
  scansThisMonth: number;
  newUsersThisMonth: number;
}

export interface AnalyticsTrend {
  labels: string[];
  scans: number[];
  tokens: number[];
  users: number[];
}

export const analytics = {
  summary: (from?: string, to?: string) =>
    apiClient.get<AnalyticsSummary>('/api/analytics/summary', { from, to }),

  trends: (range: '7d' | '30d', from?: string, to?: string) =>
    apiClient.get<AnalyticsTrend>('/api/analytics/trends', { range, from, to }),

  topProducts: (from?: string, to?: string, limit = 10) =>
    apiClient.get<Array<{ productName: string; scanCount: number; percentage: number }>>(
      '/api/analytics/top-products',
      { from, to, limit }
    ),

  topUsers: (from?: string, to?: string, limit = 10) =>
    apiClient.get<Array<{ userId: string; email: string; scanCount: number; percentage: number }>>(
      '/api/analytics/top-users',
      { from, to, limit }
    ),

  apiUsage: (from?: string, to?: string) =>
    apiClient.get<{
      totalTokens: number;
      totalCost: number;
      byApiKey: Array<{ apiKeyIndex: number; tokens: number; cost: number; scanCount: number }>;
    }>('/api/analytics/api-usage', { from, to }),
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const exportApi = {
  excel: (params?: { from?: string; to?: string; userId?: string }) =>
    apiClient.post<{ downloadUrl: string; expiresAt: string }>('/api/export/excel', params),
};