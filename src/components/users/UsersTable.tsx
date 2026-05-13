import { Shield, Pencil, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback } from '../ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Skeleton } from '../ui/skeleton'
import { isAdminRole, normalizeRole, type UserProfile, type UserRole } from '../../types'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

interface UsersTableProps {
  users?: UserProfile[]
  loading?: boolean
  onEditRole: (user: UserProfile) => void
  onDelete: (user: UserProfile) => void
  canManage: boolean
}

const roleConfig: Record<UserRole, { variant: 'default' | 'success'; label: string }> = {
  admin: { variant: 'success', label: 'Quản trị viên' },
  manager: { variant: 'default', label: 'Quản lý' },
  user: { variant: 'default', label: 'Người dùng' },
}

function getDisplayName(user: UserProfile): string {
  return user.display_name?.trim() || user.email
}

function getInitials(user: UserProfile): string {
  const source = user.display_name?.trim() || user.email
  return source.slice(0, 2).toUpperCase()
}

function getRoleDetail(user: UserProfile): string {
  return [user.job_title, user.department].filter(Boolean).join(' • ') || 'Chưa cập nhật hồ sơ'
}

function formatUserDate(value: string | null | undefined): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return format(date, 'dd/MM/yyyy', { locale: vi })
}

function formatUserDateTime(value: string | null | undefined): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return format(date, 'dd/MM/yyyy HH:mm', { locale: vi })
}

export function UsersTable({ users, loading, onEditRole, onDelete, canManage }: UsersTableProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-[var(--color-outline-variant)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--color-surface-container-low)]">
              <TableHead className="text-[var(--color-on-surface-variant)]">Người dùng</TableHead>
              <TableHead className="text-[var(--color-on-surface-variant)]">Vai trò</TableHead>
              <TableHead className="text-[var(--color-on-surface-variant)]">Liên hệ</TableHead>
              <TableHead className="text-[var(--color-on-surface-variant)]">Cập nhật</TableHead>
              <TableHead className="text-[var(--color-on-surface-variant)]">Đăng nhập gần nhất</TableHead>
              {canManage && <TableHead className="text-right text-[var(--color-on-surface-variant)]">Thao tác</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                {canManage && <TableCell><Skeleton className="h-8 w-20 ml-auto" /></TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (!users || users.length === 0) {
    return (
      <div className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-12 text-center">
        <p className="text-[var(--color-on-surface-variant)]">Không có người dùng nào</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-[var(--color-outline-variant)] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[var(--color-surface-container-low)]">
            <TableHead className="text-[var(--color-on-surface-variant)]">Người dùng</TableHead>
            <TableHead className="text-[var(--color-on-surface-variant)]">Vai trò</TableHead>
            <TableHead className="text-[var(--color-on-surface-variant)]">Liên hệ</TableHead>
            <TableHead className="text-[var(--color-on-surface-variant)]">Ngày tạo</TableHead>
            <TableHead className="text-[var(--color-on-surface-variant)]">Cập nhật</TableHead>
            <TableHead className="text-[var(--color-on-surface-variant)]">Đăng nhập gần nhất</TableHead>
            {canManage && <TableHead className="text-right text-[var(--color-on-surface-variant)]">Thao tác</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const role = roleConfig[normalizeRole(user.role)] ?? roleConfig.user
            const canEditRole = canManage && !isAdminRole(user.role)
            return (
              <TableRow
                key={user.id}
                className="transition-colors hover:bg-[var(--color-surface-container)]"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] text-sm">
                        {getInitials(user)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-medium text-[var(--color-on-surface)]">
                        {getDisplayName(user)}
                      </span>
                      <span className="truncate text-xs text-[var(--color-on-surface-variant)]">
                        {user.email}
                      </span>
                      {user.company && (
                        <span className="truncate text-xs text-[var(--color-on-surface-variant)]">
                          {user.company}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge variant={role.variant} className="w-fit">
                      {isAdminRole(user.role) && <Shield className="mr-1 h-3 w-3" />}
                      {role.label}
                    </Badge>
                    <span className="max-w-40 truncate text-xs text-[var(--color-on-surface-variant)]">
                      {getRoleDetail(user)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-[var(--color-on-surface)]">
                  <div className="flex flex-col">
                    <span>{user.phone || '—'}</span>
                    {user.department && (
                      <span className="text-xs text-[var(--color-on-surface-variant)]">{user.department}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-[var(--color-on-surface)]">
                  {formatUserDate(user.created_at)}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-[var(--color-on-surface)]">
                  {formatUserDate(user.updated_at)}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-[var(--color-on-surface)]">
                  {formatUserDateTime(user.last_login)}
                </TableCell>
                {canManage && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="text"
                        size="icon"
                        onClick={() => onEditRole(user)}
                        disabled={!canEditRole}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="text" size="icon" onClick={() => onDelete(user)}>
                        <Trash2 className="h-4 w-4 text-[var(--color-error)]" />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}