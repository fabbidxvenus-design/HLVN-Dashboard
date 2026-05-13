import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Skeleton } from '../ui/skeleton'

interface ApiUsageRow {
  key: string
  description: string
  scanCount: number
  avgLatency: number
  costEstimate: string
}

interface ApiUsageTableProps {
  data?: ApiUsageRow[]
  loading?: boolean
}

export function ApiUsageTable({ data, loading }: ApiUsageTableProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-[var(--color-outline-variant)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--color-surface-container-low)]">
              <TableHead>Key Index</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead className="text-right">Số lượt</TableHead>
              <TableHead className="text-right">Latency TB</TableHead>
              <TableHead className="text-right">Chi phí ước tính</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-[var(--color-outline-variant)] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[var(--color-surface-container-low)]">
            <TableHead className="text-[var(--color-on-surface-variant)]">Key Index</TableHead>
            <TableHead className="text-[var(--color-on-surface-variant)]">Mô tả</TableHead>
            <TableHead className="text-right text-[var(--color-on-surface-variant)]">Số lượt</TableHead>
            <TableHead className="text-right text-[var(--color-on-surface-variant)]">Latency TB</TableHead>
            <TableHead className="text-right text-[var(--color-on-surface-variant)]">Chi phí ước tính</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.key}
              className="transition-colors hover:bg-[var(--color-surface-container)]"
            >
              <TableCell className="font-mono text-sm font-medium text-[var(--color-on-surface)]">
                {row.key}
              </TableCell>
              <TableCell className="text-sm text-[var(--color-on-surface)]">
                {row.description}
              </TableCell>
              <TableCell className="text-right font-medium text-[var(--color-on-surface)]">
                {row.scanCount.toLocaleString('vi-VN')}
              </TableCell>
              <TableCell className="text-right text-[var(--color-on-surface)]">
                {row.avgLatency.toFixed(0)}ms
              </TableCell>
              <TableCell className="text-right text-[var(--color-on-surface)]">
                {row.costEstimate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}