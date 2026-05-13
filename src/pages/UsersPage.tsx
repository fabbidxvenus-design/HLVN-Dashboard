import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../components/ui/button'
import { UserFilters } from '../components/users/UserFilters'
import { UsersTable } from '../components/users/UsersTable'
import { CreateUserDialog } from '../components/users/CreateUserDialog'
import { EditUserRoleDialog } from '../components/users/EditUserRoleDialog'
import { DeleteUserDialog } from '../components/users/DeleteUserDialog'
import { useAuth } from '../hooks/use-auth'
import { api } from '../lib/api'
import { mapUser } from '../lib/api-adapters'
import { useNotificationStore } from '../stores/notification-store'
import { isAdminRole, type UserProfile, type UserRole } from '../types'
import type { NotificationItem } from '../types/notification'

export function UsersPage() {
  const { user } = useAuth()
  const canManage = isAdminRole(user?.role)

  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [editUser, setEditUser] = useState<UserProfile | null>(null)
  const [deleteUser, setDeleteUser] = useState<UserProfile | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchUsers() {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams({ page: '1', limit: '100' })
      if (search) params.set('search', search)

      try {
        const response = await api.get<unknown[]>(`/users?${params.toString()}`)
        if (!response.success || !response.data) {
          throw new Error(response.error || 'Không thể tải danh sách người dùng')
        }
        if (!cancelled) {
          setUsers(response.data.map((item) => mapUser(item as Record<string, unknown>)))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Không thể tải danh sách người dùng')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchUsers()
    return () => { cancelled = true }
  }, [search])

  const handleCreateUser = async (data: { email: string; password: string; role: string }) => {
    setActionLoading(true)
    try {
      const response = await api.post<unknown>('/users', data)
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Không thể tạo người dùng')
      }
      const newUser = mapUser(response.data as Record<string, unknown>)
      setUsers((prev) => [...prev, newUser])
      setCreateOpen(false)

      if (canManage) {
        const notification: NotificationItem = {
          id: `user-created:${newUser.id}`,
          type: 'user_created',
          title: 'Người dùng mới',
          description: `Đã tạo tài khoản ${data.email}`,
          createdAt: new Date().toISOString(),
          read: false,
          href: '/users',
          severity: 'success',
        }
        useNotificationStore.getState().addNotification(notification)
      }
    } finally {
      setActionLoading(false)
    }
  }

  const handleUpdateRole = async (role: UserRole) => {
    if (!editUser) return
    setActionLoading(true)
    try {
      const response = await api.patch<unknown>(`/users/${editUser.id}/role`, { role })
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Không thể cập nhật vai trò')
      }
      const updatedUser = mapUser(response.data as Record<string, unknown>)
      setUsers((prev) => prev.map((item) => (item.id === editUser.id ? updatedUser : item)))

      if (canManage) {
        const notification: NotificationItem = {
          id: `role-updated:${editUser.id}`,
          type: 'role_updated',
          title: 'Cập nhật vai trò',
          description: `${editUser.email} đã được chuyển sang vai trò ${role}`,
          createdAt: new Date().toISOString(),
          read: false,
          href: '/users',
          severity: 'info',
        }
        useNotificationStore.getState().addNotification(notification)
      }

      setEditUser(null)
    } finally {
      setActionLoading(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!deleteUser) return
    setActionLoading(true)
    try {
      const response = await api.delete(`/users/${deleteUser.id}`)
      if (!response.success) {
        throw new Error(response.error || 'Không thể xóa người dùng')
      }
      setUsers((prev) => prev.filter((item) => item.id !== deleteUser.id))
      setDeleteUser(null)
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold text-[var(--color-on-surface)]">
            Người dùng
          </h1>
          <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">
            Quản lý tài khoản và phân quyền người dùng
          </p>
        </div>
        {canManage && (
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            Thêm người dùng
          </Button>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-[var(--color-error)] bg-[var(--color-error-container)]/20 p-3 text-sm text-[var(--color-error)]">
          {error}
        </div>
      )}

      <UserFilters search={search} onSearchChange={setSearch} />

      <UsersTable
        users={users}
        loading={loading}
        onEditRole={setEditUser}
        onDelete={setDeleteUser}
        canManage={canManage}
      />

      <CreateUserDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateUser}
        loading={actionLoading}
      />

      <EditUserRoleDialog
        user={editUser}
        open={!!editUser}
        onOpenChange={(open) => !open && setEditUser(null)}
        onSubmit={handleUpdateRole}
        loading={actionLoading}
      />

      <DeleteUserDialog
        user={deleteUser}
        open={!!deleteUser}
        onOpenChange={(open) => !open && setDeleteUser(null)}
        onConfirm={handleDeleteUser}
        loading={actionLoading}
      />
    </div>
  )
}
