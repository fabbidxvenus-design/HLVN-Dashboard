'use client'

import type { ApiUsageRow } from '@/types/analytics'
import { formatNumber, formatCurrency } from '@/lib/format'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Key } from 'lucide-react'

interface ApiUsageTableProps {
  data?: ApiUsageRow[]
  isLoading?: boolean
}

export function ApiUsageTable({ data, isLoading }: ApiUsageTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-card)] shadow-[var(--shadow-card)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--background-muted)] border-b border-[var(--border)]">
              <TableHead className="font-semibold text-[var(--text-caption)] text-xs uppercase tracking-wide">API Key</TableHead>
              <TableHead className="font-semibold text-right text-[var(--text-caption)] text-xs uppercase tracking-wide">Input</TableHead>
              <TableHead className="font-semibold text-right text-[var(--text-caption)] text-xs uppercase tracking-wide">Output</TableHead>
              <TableHead className="font-semibold text-right text-[var(--text-caption)] text-xs uppercase tracking-wide">Tổng</TableHead>
              <TableHead className="font-semibold text-right text-[var(--text-caption)] text-xs uppercase tracking-wide">Chi phí</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 3 }).map((_, i) => (
              <TableRow key={i} className="border-b border-[var(--border)] last:border-0">
                <TableCell><Skeleton className="h-5 w-[60px]" /></TableCell>
                <TableCell><Skeleton className="h-5 w-[80px] ml-auto" /></TableCell>
                <TableCell><Skeleton className="h-5 w-[80px] ml-auto" /></TableCell>
                <TableCell><Skeleton className="h-5 w-[80px] ml-auto" /></TableCell>
                <TableCell><Skeleton className="h-5 w-[60px] ml-auto" /></TableCell>
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
          <Key className="w-6 h-6 text-[var(--text-caption)]" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-[var(--text-body)] mb-1">Không có dữ liệu API usage</p>
          <p className="text-xs text-[var(--text-caption)]">Thông tin sử dụng API sẽ hiển thị tại đây</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-card)] shadow-[var(--shadow-card)] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[var(--background-muted)] border-b border-[var(--border)]">
            <TableHead className="font-semibold text-[var(--text-caption)] text-xs uppercase tracking-wide">API Key</TableHead>
            <TableHead className="font-semibold text-right text-[var(--text-caption)] text-xs uppercase tracking-wide">Input</TableHead>
            <TableHead className="font-semibold text-right text-[var(--text-caption)] text-xs uppercase tracking-wide">Output</TableHead>
            <TableHead className="font-semibold text-right text-[var(--text-caption)] text-xs uppercase tracking-wide">Tổng</TableHead>
            <TableHead className="font-semibold text-right text-[var(--text-caption)] text-xs uppercase tracking-wide">Chi phí</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, idx) => {
            const inputTokens = Math.floor(row.tokens * 0.65)
            const outputTokens = row.tokens - inputTokens
            return (
              <TableRow key={idx} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-elevated)] transition-colors">
                <TableCell className="font-mono font-medium text-[var(--text-body)]">#{row.apiKeyIndex}</TableCell>
                <TableCell className="text-right font-mono text-[var(--text-body)]">{formatNumber(inputTokens)}</TableCell>
                <TableCell className="text-right font-mono text-[var(--text-body)]">{formatNumber(outputTokens)}</TableCell>
                <TableCell className="text-right font-mono text-[var(--text-body)]">{formatNumber(row.tokens)}</TableCell>
                <TableCell className="text-right text-[var(--success)] font-mono">{formatCurrency(row.cost)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}