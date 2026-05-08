'use client'

import { Search, X, SlidersHorizontal } from 'lucide-react'
import type { UserRole } from '@/types/user'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface UserFiltersProps {
  search: string
  role: UserRole | 'all'
  onSearchChange: (search: string) => void
  onRoleChange: (role: UserRole | 'all') => void
  onClearFilters: () => void
}

export function UserFilters({ search, role, onSearchChange, onRoleChange, onClearFilters }: UserFiltersProps) {
  return (
    <div className="flex gap-[var(--space-tight)] items-center flex-wrap p-4 rounded-[var(--radius-card)] bg-[var(--surface-elevated)] border border-[var(--border)]">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-[320px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-caption)]" />
        <Input
          type="text"
          placeholder="Tìm kiếm người dùng..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9"
        />
        {search && (
          <button
            onClick={onClearFilters}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-caption)] hover:text-[var(--text-body)] transition-colors"
            aria-label="Xóa tìm kiếm"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Role filter */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-[var(--text-caption)] shrink-0" />
        <Select value={role} onValueChange={(val) => onRoleChange(val as UserRole | 'all')}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Quản lý</SelectItem>
            <SelectItem value="user">Người dùng</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}