import { Eye, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Skeleton } from '../ui/skeleton'
import type { Scan } from '../../types'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

interface ScansTableProps {
  scans?: Scan[]
  loading?: boolean
  onView: (scan: Scan) => void
  onDelete?: (scan: Scan) => void
  canDelete?: boolean
  actionLoading?: boolean
}

const statusConfig = {
  success: { variant: 'success' as const, label: 'Thành công' },
  pending: { variant: 'warning' as const, label: 'Đang xử lý' },
  failed: { variant: 'error' as const, label: 'Thất bại' },
}

function formatScanDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'

  return format(date, 'dd/MM/yyyy HH:mm', { locale: vi })
}

export function ScansTable({ scans, loading, onView, onDelete, canDelete, actionLoading }: ScansTableProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-[var(--color-outline-variant)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--color-surface-container-low)]">
              <TableHead className="text-[var(--color-on-surface-variant)]">Thời gian</TableHead>
              <TableHead className="text-[var(--color-on-surface-variant)]">Người dùng</TableHead>
              <TableHead className="text-[var(--color-on-surface-variant)]">Sản phẩm</TableHead>
              <TableHead className="text-[var(--color-on-surface-variant)]">Trạng thái</TableHead>
              <TableHead className="text-right text-[var(--color-on-surface-variant)]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                <TableCell><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (!scans || scans.length === 0) {
    return (
      <div className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-12 text-center">
        <p className="text-[var(--color-on-surface-variant)]">Không có lượt quét nào</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-[var(--color-outline-variant)] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[var(--color-surface-container-low)]">
            <TableHead className="text-[var(--color-on-surface-variant)]">Thời gian</TableHead>
            <TableHead className="text-[var(--color-on-surface-variant)]">Người dùng</TableHead>
            <TableHead className="text-[var(--color-on-surface-variant)]">Sản phẩm</TableHead>
            <TableHead className="text-[var(--color-on-surface-variant)]">Trạng thái</TableHead>
            <TableHead className="text-right text-[var(--color-on-surface-variant)]">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scans.map((scan) => {
            const status = statusConfig[scan.status] || statusConfig.pending
            return (
              <TableRow
                key={scan.id}
                className="transition-colors hover:bg-[var(--color-surface-container)]"
              >
                <TableCell className="text-sm text-[var(--color-on-surface)]">
                  {formatScanDate(scan.created_at)}
                </TableCell>
                <TableCell className="text-sm text-[var(--color-on-surface)]">
                  {scan.user_email}
                </TableCell>
                <TableCell className="text-sm text-[var(--color-on-surface)]">
                  {scan.product}
                </TableCell>
                <TableCell>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="text" size="icon" onClick={() => onView(scan)} disabled={actionLoading}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {canDelete && onDelete && (
                      <Button variant="text" size="icon" onClick={() => onDelete(scan)}>
                        <Trash2 className="h-4 w-4 text-[var(--color-error)]" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}