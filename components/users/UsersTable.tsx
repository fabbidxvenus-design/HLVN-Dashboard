'use client'

import { useMemo } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type OnChangeFn,
} from '@tanstack/react-table'
import type { UserProfile } from '@/types/user'
import { UserRoleBadge } from './UserRoleBadge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Users } from 'lucide-react'

interface UsersTableProps {
  users: UserProfile[]
  isLoading: boolean
  page: number
  limit: number
  total: number
  sorting: SortingState
  onSortingChange: OnChangeFn<SortingState>
  onPageChange: (page: number) => void
  onEditRole: (user: UserProfile) => void
  onDelete: (user: UserProfile) => void
}

export function UsersTable({
  users,
  isLoading,
  page,
  limit,
  total,
  sorting,
  onSortingChange,
  onPageChange,
  onEditRole,
  onDelete,
}: UsersTableProps) {
  const columns = useMemo<ColumnDef<UserProfile>[]>(
    () => [
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
          <span className="font-medium text-[var(--text-body)]">{row.original.email}</span>
        ),
      },
      {
        accessorKey: 'role',
        header: 'Vai trò',
        cell: ({ row }) => <UserRoleBadge role={row.original.role} />,
      },
      {
        accessorKey: 'lastLogin',
        header: 'Đăng nhập cuối',
        cell: ({ row }) => {
          const date = row.original.lastLogin
          if (!date) return <span className="text-[var(--text-caption)]">Chưa đăng nhập</span>
          return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi })
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Ngày tạo',
        cell: ({ row }) => format(new Date(row.original.createdAt), 'dd/MM/yyyy', { locale: vi }),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex gap-1 justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditRole(row.original)}
              className="h-8 w-8 p-0 text-[var(--text-caption)] hover:text-[var(--text-heading)] hover:bg-[var(--background-muted)] transition-colors"
              aria-label="Sửa vai trò người dùng"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(row.original)}
              className="h-8 w-8 p-0 text-[var(--error)] hover:bg-destructive/10 hover:text-destructive transition-colors"
              aria-label="Xóa người dùng"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ),
      },
    ],
    [onEditRole, onDelete]
  )

  const table = useReactTable({
    data: users,
    columns,
    state: { sorting },
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const totalPages = Math.ceil(total / limit)
  const startItem = (page - 1) * limit + 1
  const endItem = Math.min(page * limit, total)

  return (
    <div className="space-y-[var(--space-inline)]">
      <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-card)] shadow-[var(--shadow-card)] overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-[var(--background-muted)] border-b border-[var(--border)]">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-12 font-semibold text-[var(--text-body)]"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        className="flex items-center gap-1.5 hover:text-[var(--primary)] transition-colors outline-none focus-visible:text-[var(--primary)]"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === 'asc' && <ChevronUpIcon className="w-3.5 h-3.5" />}
                        {header.column.getIsSorted() === 'desc' && <ChevronDownIcon className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-b border-[var(--border-muted)] last:border-0">
                  <TableCell><Skeleton className="h-5 w-[200px]" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-[120px]" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-[80px]" /></TableCell>
                </TableRow>
              ))
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-40 text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--background-muted)] flex items-center justify-center">
                      <Users className="w-6 h-6 text-[var(--text-caption)]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-body)] mb-1">Không tìm thấy người dùng</p>
                      <p className="text-xs text-[var(--text-caption)]">Thử điều chỉnh bộ lọc hoặc tạo người dùng mới</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b border-[var(--border-muted)] last:border-0 hover:bg-[var(--background-muted)] transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {total > 0 && (
        <div className="flex items-center justify-between text-sm text-[var(--text-caption)]">
          <span>
            Hiển thị {startItem}–{endItem} trong {total} người dùng
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
            >
              Trước
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = i + 1
              if (totalPages > 5) {
                if (page > 3) pageNum = page - 2 + i
                if (page > totalPages - 2) pageNum = totalPages - 4 + i
              }
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
            >
              Sau
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}