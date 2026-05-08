'use client'

import type { TopUser } from '@/types/analytics'
import { formatNumber } from '@/lib/format'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Users } from 'lucide-react'

interface TopUsersTableProps {
  data?: TopUser[]
  isLoading?: boolean
  limit?: number
}

export function TopUsersTable({ data, isLoading, limit = 10 }: TopUsersTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-card)] shadow-[var(--shadow-card)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--background-muted)] border-b border-[var(--border)]">
              <TableHead className="font-semibold text-[var(--text-body)]">Email</TableHead>
              <TableHead className="font-semibold text-right text-[var(--text-body)]">Số scan</TableHead>
              <TableHead className="font-semibold text-right text-[var(--text-body)]">Tỷ lệ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-b border-[var(--border-muted)] last:border-0">
                <TableCell><Skeleton className="h-5 w-[180px]" /></TableCell>
                <TableCell><Skeleton className="h-5 w-[60px] ml-auto" /></TableCell>
                <TableCell><Skeleton className="h-5 w-[50px] ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-card)] shadow-[var(--shadow-card)] p-10 flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[var(--background-muted)] flex items-center justify-center">
          <Users className="w-6 h-6 text-[var(--text-caption)]" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-[var(--text-body)] mb-1">Chưa có dữ liệu người dùng</p>
          <p className="text-[var(--text-caption)]">Dữ liệu hoạt động sẽ hiển thị tại đây khi có người dùng</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-card)] shadow-[var(--shadow-card)] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[var(--background-muted)] border-b border-[var(--border)]">
            <TableHead className="font-semibold text-[var(--text-body)]">Email</TableHead>
            <TableHead className="font-semibold text-right text-[var(--text-body)]">Số scan</TableHead>
            <TableHead className="font-semibold text-right text-[var(--text-body)]">Tỷ lệ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(0, limit).map((user, idx) => (
            <TableRow key={idx} className="border-b border-[var(--border-muted)] last:border-0 hover:bg-[var(--background-muted)] transition-colors">
              <TableCell className="font-medium text-[var(--text-body)]">{user.email}</TableCell>
              <TableCell className="text-right text-[var(--text-body)]">{formatNumber(user.scanCount)}</TableCell>
              <TableCell className="text-right text-[var(--text-caption)]">{user.percentage.toFixed(1)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}