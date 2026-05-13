import type { ReactNode } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { normalizeRole, type UserRole } from '../../types/user'

interface RoleGuardProps {
  allowedRoles: UserRole[]
  children: ReactNode
  fallback?: ReactNode
}

export function RoleGuard({ allowedRoles, children, fallback }: RoleGuardProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="p-8 text-center text-sm text-on-surface-variant">
        Đang kiểm tra quyền truy cập...
      </div>
    )
  }

  const normalizedRole: UserRole | undefined = user?.role
    ? normalizeRole(user.role)
    : undefined

  if (!normalizedRole || !allowedRoles.includes(normalizedRole)) {
    return (
      fallback ?? (
        <div className="p-8 text-center">
          <h2 className="font-headline text-2xl font-semibold text-on-surface">
            Không có quyền truy cập
          </h2>
          <p className="mt-2 text-on-surface-variant font-label text-sm">
            Bạn không có quyền truy cập trang này.
          </p>
        </div>
      )
    )
  }

  return <>{children}</>
}