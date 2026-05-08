'use client'

import { Badge } from '@/components/ui/badge'
import type { UserRole } from '@/types/user'

interface UserRoleBadgeProps {
  role: UserRole
}

const roleConfig: Record<UserRole, { label: string; className: string }> = {
  admin: {
    label: 'Admin',
    className: 'bg-[var(--primary)] text-white',
  },
  manager: {
    label: 'Quản lý',
    className: 'bg-[var(--warning)] text-white',
  },
  user: {
    label: 'Người dùng',
    className: 'bg-[var(--text-muted)] text-white',
  },
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  const config = roleConfig[role] || roleConfig.user
  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  )
}