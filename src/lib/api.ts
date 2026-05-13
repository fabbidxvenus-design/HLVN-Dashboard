import type { ApiResponse } from '../types/api'

const API_BASE = '/api'

interface RefreshTokensResponse {
  accessToken: string
  refreshToken: string
}

function clearStoredSession() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) return null

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })

  const data = await res.json() as ApiResponse<RefreshTokensResponse>
  if (!data.success || !data.data) {
    clearStoredSession()
    return null
  }

  localStorage.setItem('accessToken', data.data.accessToken)
  localStorage.setItem('refreshToken', data.data.refreshToken)
  return data.data.accessToken
}

function isAuthFailure<T>(response: ApiResponse<T>): boolean {
  return response.code === 'AUTH_FAILED' || response.error === 'Authentication required'
}

async function executeRequest<T>(
  method: string,
  path: string,
  body: unknown,
  token: string | null
): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  return await res.json() as ApiResponse<T>
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('accessToken')
  const response = await executeRequest<T>(method, path, body, token)

  if (!isAuthFailure(response)) return response

  const nextToken = await refreshAccessToken()
  if (!nextToken) return response

  return executeRequest<T>(method, path, body, nextToken)
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body: unknown) => request<T>('POST', path, body),
  patch: <T>(path: string, body: unknown) => request<T>('PATCH', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
}