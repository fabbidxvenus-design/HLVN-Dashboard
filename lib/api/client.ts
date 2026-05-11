import type { ApiResponse } from '@/types/api';
import { ApiError } from '@/types/api';
import { ERROR_MESSAGES } from './errors';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? 'http://localhost:3001';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

// Lazy import mock handlers to avoid circular issues
let mockHandlers: typeof import('./mock-data').mockHandlers | null = null;

async function getMockHandlers() {
  if (!mockHandlers) {
    const mod = await import('./mock-data');
    mockHandlers = mod.mockHandlers;
  }
  return mockHandlers;
}

function isMockErrorResponse(resp: ApiResponse<unknown>): resp is { success: false; error: string; code: 'FORBIDDEN' | 'AUTH_FAILED' | 'VALIDATION_ERROR' | 'NOT_FOUND' | 'QUOTA_EXCEEDED' | 'PROVIDER_ERROR' | 'RATE_LIMITED' | 'INTERNAL_ERROR' } {
  return !resp.success;
}

type FetchOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

async function apiFetch<T>(
  path: string,
  options: FetchOptions = {},
  accessToken?: string | null
): Promise<ApiResponse<T>> {
  // Build URL
  let url = `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  if (options.params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(options.params)) {
      if (value !== undefined) {
        searchParams.set(key, String(value));
      }
    }
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  // Auto-load token from localStorage if not provided
  let token = accessToken;
  if (!token && typeof window !== 'undefined') {
    const stored = localStorage.getItem('hlvn_session');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        token = parsed.accessToken ?? null;
      } catch {
        // ignore parse error
      }
    }
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      let errorCode: 'AUTH_FAILED' | 'FORBIDDEN' | 'VALIDATION_ERROR' | 'NOT_FOUND' | 'QUOTA_EXCEEDED' | 'PROVIDER_ERROR' | 'RATE_LIMITED' | 'INTERNAL_ERROR' = 'INTERNAL_ERROR';
      let message = ERROR_MESSAGES.UNKNOWN;

      try {
        const errData = await response.json() as { code?: string; message?: string };
        if (errData.code && errData.code in ERROR_MESSAGES) {
          errorCode = errData.code as typeof errorCode;
        }
        if (errData.message) message = errData.message;
      } catch {
        message = ERROR_MESSAGES.UNKNOWN;
      }

      if (response.status === 401 || response.status === 403) {
        errorCode = 'AUTH_FAILED';
        message = ERROR_MESSAGES.AUTH_FAILED;
      }

      throw new ApiError(message, errorCode, response.status);
    }

    const data = await response.json() as ApiResponse<T>;
    return data;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    // Network / fetch error
    throw new ApiError(ERROR_MESSAGES.NETWORK, 'PROVIDER_ERROR', 0);
  }
}

// ---------------------------------------------------------------------------
// Core GET / POST / PATCH / DELETE helpers
// ---------------------------------------------------------------------------

export const apiClient = {
  async get<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
    accessToken?: string | null
  ): Promise<ApiResponse<T>> {
    if (USE_MOCK) {
      const handlers = await getMockHandlers();
      // Route to the right mock handler
      const result = await routeMock<T>(path, 'GET', undefined, params);
      return result as ApiResponse<T>;
    }
    return apiFetch<T>(path, { method: 'GET', params }, accessToken);
  },

  async post<T>(
    path: string,
    body?: unknown,
    accessToken?: string | null
  ): Promise<ApiResponse<T>> {
    if (USE_MOCK) {
      return routeMock<T>(path, 'POST', body) as Promise<ApiResponse<T>>;
    }
    return apiFetch<T>(path, { method: 'POST', body: JSON.stringify(body) }, accessToken);
  },

  async patch<T>(
    path: string,
    body?: unknown,
    accessToken?: string | null
  ): Promise<ApiResponse<T>> {
    if (USE_MOCK) {
      return routeMock<T>(path, 'PATCH', body) as Promise<ApiResponse<T>>;
    }
    return apiFetch<T>(path, { method: 'PATCH', body: JSON.stringify(body) }, accessToken);
  },

  async delete<T>(
    path: string,
    accessToken?: string | null
  ): Promise<ApiResponse<T>> {
    if (USE_MOCK) {
      return routeMock<T>(path, 'DELETE') as Promise<ApiResponse<T>>;
    }
    return apiFetch<T>(path, { method: 'DELETE' }, accessToken);
  },
};

// ---------------------------------------------------------------------------
// Mock router
// ---------------------------------------------------------------------------

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

async function routeMock<T>(
  path: string,
  method: HttpMethod,
  body?: unknown,
  params?: Record<string, string | number | boolean | undefined>
): Promise<ApiResponse<T>> {
  const handlers = await getMockHandlers();

  // Auth
  if (path === '/api/auth/login' && method === 'POST') {
    const { email, password } = (body as { email: string; password: string }) ?? {};
    return handlers.auth.login(email ?? '', password ?? '') as unknown as ApiResponse<T>;
  }
  if (path === '/api/auth/me' && method === 'GET') {
    return handlers.auth.me() as unknown as ApiResponse<T>;
  }
  if (path === '/api/auth/logout' && method === 'POST') {
    return handlers.auth.logout() as unknown as ApiResponse<T>;
  }

  // Users
  if (path === '/api/users' && method === 'GET') {
    return handlers.users.list({
      page: params?.page as number | undefined,
      limit: params?.limit as number | undefined,
    }) as unknown as ApiResponse<T>;
  }
  if (path === '/api/users' && method === 'POST') {
    return handlers.users.create(body as { email: string; role: import('@/types/user').UserRole }) as unknown as ApiResponse<T>;
  }
  if (path.match(/^\/api\/users\/[^/]+\/role$/) && method === 'PATCH') {
    const id = path.split('/')[3];
    const { role } = (body as { role: import('@/types/user').UserRole }) ?? {};
    return handlers.users.updateRole(id, role) as unknown as ApiResponse<T>;
  }
  if (path.match(/^\/api\/users\/[^/]+$/) && method === 'DELETE') {
    const id = path.split('/')[3];
    return handlers.users.delete(id) as unknown as ApiResponse<T>;
  }

  // Scans
  if (path === '/api/scans' && method === 'GET') {
    return handlers.scans.list({
      page: params?.page as number | undefined,
      limit: params?.limit as number | undefined,
      userId: params?.userId as string | undefined,
    }) as unknown as ApiResponse<T>;
  }
  if (path.match(/^\/api\/scans\/[^/]+$/) && method === 'GET') {
    const id = path.split('/')[3];
    return handlers.scans.detail(id) as unknown as ApiResponse<T>;
  }
  if (path.match(/^\/api\/scans\/[^/]+$/) && method === 'DELETE') {
    const id = path.split('/')[3];
    return handlers.scans.delete(id) as unknown as ApiResponse<T>;
  }

  // Analytics
  if (path === '/api/analytics/summary' && method === 'GET') {
    return handlers.analytics.summary(
      params?.from as string | undefined,
      params?.to as string | undefined
    ) as unknown as ApiResponse<T>;
  }
  if (path === '/api/analytics/trends' && method === 'GET') {
    return handlers.analytics.trends(
      (params?.range as '7d' | '30d') ?? '7d',
      params?.from as string | undefined,
      params?.to as string | undefined
    ) as unknown as ApiResponse<T>;
  }
  if (path === '/api/analytics/top-products' && method === 'GET') {
    return handlers.analytics.topProducts(
      params?.from as string | undefined,
      params?.to as string | undefined,
      params?.limit as number | undefined
    ) as unknown as ApiResponse<T>;
  }
  if (path === '/api/analytics/top-users' && method === 'GET') {
    return handlers.analytics.topUsers(
      params?.from as string | undefined,
      params?.to as string | undefined,
      params?.limit as number | undefined
    ) as unknown as ApiResponse<T>;
  }
  if (path === '/api/analytics/api-usage' && method === 'GET') {
    return handlers.analytics.apiUsage(
      params?.from as string | undefined,
      params?.to as string | undefined
    ) as unknown as ApiResponse<T>;
  }

  // Export
  if (path === '/api/export/excel' && method === 'POST') {
    return handlers.export.excel(body as { from?: string; to?: string; userId?: string } | undefined) as unknown as ApiResponse<T>;
  }

  // Fallback: not found
  return { success: false, error: 'Mock route not found', code: 'NOT_FOUND' } as unknown as ApiResponse<T>;
}