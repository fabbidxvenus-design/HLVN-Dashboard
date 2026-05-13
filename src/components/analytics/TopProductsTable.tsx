import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import type { TopProduct } from '../../types'

interface TopProductsTableProps {
  data?: TopProduct[]
  loading?: boolean
}

function isUnknownValue(value: string | null | undefined): boolean {
  const normalized = value?.trim().toLowerCase()
  return !normalized || normalized === 'unknown' || normalized === '—' || normalized === 'không rõ sản phẩm'
}

function getProductName(product: TopProduct, rank: number): string {
  if (!isUnknownValue(product.product)) return product.product.trim()
  return `Sản phẩm #${rank}`
}

export function TopProductsTable({ data, loading }: TopProductsTableProps) {
  return (
    <div className="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-5">
      <h3 className="mb-4 font-headline text-lg font-semibold text-[var(--color-on-surface)]">
        Sản phẩm quét nhiều nhất
      </h3>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[var(--color-outline-variant)]">
            <TableHead className="text-[var(--color-on-surface-variant)]">Sản phẩm</TableHead>
            <TableHead className="text-right text-[var(--color-on-surface-variant)]">Số lượt</TableHead>
            <TableHead className="text-right text-[var(--color-on-surface-variant)]">Tỷ lệ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i} className="border-b-0">
                  <TableCell>
                    <div className="h-4 w-24 animate-pulse rounded bg-[var(--color-surface-container)]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="ml-auto h-4 w-12 animate-pulse rounded bg-[var(--color-surface-container)]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="ml-auto h-4 w-16 animate-pulse rounded bg-[var(--color-surface-container)]" />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-[var(--color-on-surface-variant)]">
                Chưa có dữ liệu
              </TableCell>
            </TableRow>
          ) : (
            data?.map((item, index) => {
              const rank = index + 1
              const productName = getProductName(item, rank)

              return (
                <TableRow
                  key={`${item.product}:${rank}`}
                  className="border-b-0 transition-colors hover:bg-[var(--color-surface-container)]"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-[var(--color-secondary-container)] text-xs font-medium text-[var(--color-on-secondary-container)]">
                        {rank}
                      </span>
                      <span className="font-medium text-[var(--color-on-surface)]">{productName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-[var(--color-on-surface)]">
                    {item.count.toLocaleString('vi-VN')}
                  </TableCell>
                  <TableCell className="text-right text-[var(--color-on-surface-variant)]">
                    {item.percentage.toFixed(1)}%
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}