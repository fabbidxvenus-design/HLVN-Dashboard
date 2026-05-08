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
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { EyeIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon, PencilIcon, SearchXIcon } from 'lucide-react'
import type { ScanRecord } from '@/types/scan'
import { ScanThumbnailCell } from './ScanThumbnailCell'
import { OCRSummaryCell } from './OCRSummaryCell'
import { TokenUsageCell } from './TokenUsageCell'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface ScansTableProps {
  scans: ScanRecord[]
  isLoading: boolean
  page: number
  limit: number
  total: number
  sorting: SortingState
  onSortingChange: OnChangeFn<SortingState>
  onPageChange: (page: number) => void
  onViewDetail: (scan: ScanRecord) => void
  onDelete: (scan: ScanRecord) => void
}

export function ScansTable({
  scans,
  isLoading,
  page,
  limit,
  total,
  sorting,
  onSortingChange,
  onPageChange,
  onViewDetail,
  onDelete,
}: ScansTableProps) {
  const columns = useMemo<ColumnDef<ScanRecord>[]>(
    () => [
      {
        accessorKey: 'imageUrl',
        header: '',
        cell: ({ row }) => (
          <ScanThumbnailCell imageUrl={row.original.imageUrl} alt={row.original.ocrStructured?.title || 'Scan'} />
        ),
      },
      {
        accessorKey: 'ocrStructured',
        header: 'Sản phẩm',
        cell: ({ row }) => <OCRSummaryCell scan={row.original} />,
      },
      {
        accessorKey: 'userEmail',
        header: 'Người dùng',
        cell: ({ row }) => (
          <span className="text-sm text-[var(--text-caption)]">{row.original.userEmail || '-'}</span>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Thời gian',
        cell: ({ row }) => (
          <span className="text-sm text-[var(--text-caption)]">
            {format(new Date(row.original.timestamp), 'dd/MM/yyyy HH:mm', { locale: vi })}
          </span>
        ),
      },
      {
        accessorKey: 'tokenUsage',
        header: 'Token',
        cell: ({ row }) => <TokenUsageCell scan={row.original} />,
      },
      {
        accessorKey: 'edited',
        header: '',
        cell: ({ row }) =>
          row.original.edited ? (
            <Badge variant="outline" className="text-xs">
              <PencilIcon className="w-3 h-3 mr-1" />
              Đã sửa
            </Badge>
          ) : null,
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex gap-1 justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewDetail(row.original)}
              className="h-8 w-8 p-0"
              aria-label="Xem chi tiết scan"
            >
              <EyeIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(row.original)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              aria-label="Xóa scan"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        ),
      },
    ],
    [onViewDetail, onDelete]
  )

  const table = useReactTable({
    data: scans,
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
    <div className="space-y-4">
      <div className="border border-[var(--border)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] overflow-hidden bg-[var(--surface-card)]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-[var(--border)]">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-12 font-semibold text-[var(--text-caption)] text-xs uppercase tracking-wide bg-[var(--background-muted)]">
                    {header.isPlaceholder ? null : (
                      <button
                        className="flex items-center gap-1 hover:text-[var(--primary)] transition-colors"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === 'asc' && <ChevronUpIcon className="w-4 h-4" />}
                        {header.column.getIsSorted() === 'desc' && <ChevronDownIcon className="w-4 h-4" />}
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
                <TableRow key={i}>
                  <TableCell><Skeleton className="w-16 h-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-[200px]" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-[120px]" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-[100px]" /></TableCell>
                  <TableCell></TableCell>
                  <TableCell><Skeleton className="h-5 w-[80px]" /></TableCell>
                </TableRow>
              ))
            ) : scans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-16">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
                      <SearchXIcon className="w-6 h-6 text-[var(--text-muted)]" />
                    </div>
                    <p className="text-sm text-[var(--text-caption)]">Không tìm thấy scan nào.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-[var(--surface-elevated)] transition-colors border-b border-[var(--border)] last:border-0">
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
            Hiển thị {startItem}–{endItem} trong {total} scans
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