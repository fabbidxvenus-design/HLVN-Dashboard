'use client'

import { useState } from 'react'
import { Search, X, SlidersHorizontal, Calendar } from 'lucide-react'
import { vi } from 'date-fns/locale'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { UserProfile } from '@/types/user'

interface ScanFiltersProps {
  search: string
  userId: string
  dateFrom: string
  dateTo: string
  onSearchChange: (search: string) => void
  onUserChange: (userId: string) => void
  onDateFromChange: (date: string) => void
  onDateToChange: (date: string) => void
  onClearFilters: () => void
  users?: UserProfile[]
}

export function ScanFilters({
  search,
  userId,
  dateFrom,
  dateTo,
  onSearchChange,
  onUserChange,
  onDateFromChange,
  onDateToChange,
  onClearFilters,
  users = [],
}: ScanFiltersProps) {
  const hasFilters = search || userId !== 'all' || dateFrom || dateTo

  return (
    <div className="flex gap-[var(--space-tight)] items-center flex-wrap p-4 rounded-[var(--radius-card)] bg-[var(--surface-elevated)] border border-[var(--border)]">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-[320px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-caption)]" />
        <Input
          type="text"
          placeholder="Tìm kiếm nội dung OCR..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-caption)] hover:text-[var(--text-body)] transition-colors"
            aria-label="Xóa tìm kiếm"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* User filter */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-[var(--text-caption)] shrink-0" />
        <Select value={userId} onValueChange={(val) => onUserChange(val || 'all')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Người dùng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả người dùng</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date from */}
      <div className="flex items-center gap-1.5">
        <Calendar className="w-4 h-4 text-[var(--text-caption)] shrink-0" />
        <span className="text-xs text-[var(--text-caption)] shrink-0">Từ:</span>
        <Input
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className="w-[140px]"
        />
      </div>

      {/* Date to */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-[var(--text-caption)] shrink-0">Đến:</span>
        <Input
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className="w-[140px]"
        />
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-[var(--text-caption)] hover:text-[var(--text-body)]">
          <X className="w-4 h-4 mr-1" />
          Xóa lọc
        </Button>
      )}
    </div>
  )
}