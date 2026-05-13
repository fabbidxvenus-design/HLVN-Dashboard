export type UserRole = 'admin' | 'manager' | 'user'

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  created_at: string
  updated_at: string
  last_login: string | null
  display_name: string | null
  description: string | null
  phone: string | null
  job_title: string | null
  department: string | null
  company: string | null
  avatar_url: string | null
}

export function normalizeRole(role: string | undefined | null): UserRole {
  const lower = role?.toLowerCase()
  if (lower === 'admin') return 'admin'
  if (lower === 'manager') return 'manager'
  return 'user'
}

export function isAdminRole(role: string | undefined | null): boolean {
  return role?.toLowerCase() === 'admin'
}