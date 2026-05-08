'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { DashboardShell } from '@/components/dashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { UsersTable } from '@/components/users/UsersTable'
import { UserFilters } from '@/components/users/UserFilters'
import { CreateUserDialog } from '@/components/users/CreateUserDialog'
import { EditUserRoleDialog } from '@/components/users/EditUserRoleDialog'
import { DeleteUserDialog } from '@/components/users/DeleteUserDialog'
import { useUsersQuery } from '@/hooks/useUsersQuery'
import type { UserProfile } from '@/types/user'
import type { SortingState } from '@tanstack/react-table'

export default function UsersPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogUser, setEditDialogUser] = useState<UserProfile | null>(null)
  const [deleteDialogUser, setDeleteDialogUser] = useState<UserProfile | null>(null)

  const {
    users: usersList,
    meta,
    isLoading,
    error,
    page,
    limit,
    search,
    role,
    sortBy,
    sortOrder,
    refetch,
    setSearch,
    setRole,
    setPage,
    setSorting,
    clearFilters,
  } = useUsersQuery({
    onError: (msg) => toast.error(msg),
  })

  const handleSortingChange = (updater: SortingState | ((old: SortingState) => SortingState)) => {
    const newSorting = typeof updater === 'function' ? updater([]) : updater
    if (newSorting.length > 0) {
      setSorting(newSorting[0].id, newSorting[0].desc ? 'desc' : 'asc')
    }
  }

  return (
    <DashboardShell title="Người dùng">
      <div className="space-y-6">
        {/* Header with Create button */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-[var(--radius-card)] bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[var(--primary)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-[var(--text-heading)] tracking-tight">Quản lý người dùng</h1>
              <p className="text-sm text-[var(--text-caption)] mt-0.5">Xem, tạo, chỉnh sửa và xóa người dùng trong hệ thống</p>
            </div>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)} size="sm" className="sm:shrink-0">
            <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
            Thêm người dùng
          </Button>
        </div>

        {/* Filters */}
        <UserFilters
          search={search}
          role={role as 'all'}
          onSearchChange={setSearch}
          onRoleChange={setRole}
          onClearFilters={clearFilters}
        />

        {/* Error state */}
        {error && (
          <Card className="border-destructive">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-destructive">{error}</span>
                <Button variant="outline" size="sm" onClick={refetch} className="hover:bg-[var(--surface-elevated)] transition-colors">
                  Thử lại
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Table */}
        <UsersTable
          users={usersList}
          isLoading={isLoading}
          page={page}
          limit={limit}
          total={meta?.total || 0}
          sorting={[{ id: sortBy, desc: sortOrder === 'desc' }]}
          onSortingChange={handleSortingChange}
          onPageChange={setPage}
          onEditRole={setEditDialogUser}
          onDelete={setDeleteDialogUser}
        />
      </div>

      {/* Dialogs */}
      <CreateUserDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={refetch}
      />

      <EditUserRoleDialog
        open={!!editDialogUser}
        onOpenChange={(open) => !open && setEditDialogUser(null)}
        user={editDialogUser}
        onSuccess={refetch}
      />

      <DeleteUserDialog
        open={!!deleteDialogUser}
        onOpenChange={(open) => !open && setDeleteDialogUser(null)}
        user={deleteDialogUser}
        onSuccess={refetch}
      />
    </DashboardShell>
  )
}