'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { EyeIcon, PencilIcon } from 'lucide-react'
import type { ScanRecord } from '@/types/scan'
import { scans as scansEndpoints } from '@/lib/api/endpoints'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScanThumbnailCell } from './ScanThumbnailCell'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface ScanDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  scanId: string | null
}

export function ScanDetailDialog({ open, onOpenChange, scanId }: ScanDetailDialogProps) {
  const [data, setData] = useState<{ scan: ScanRecord; user: { id: string; email: string } } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open || !scanId) {
      setData(null)
      return
    }

    const fetchDetail = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await scansEndpoints.detail(scanId)
        if (!response.success) {
          setError(response.error || 'Không thể tải chi tiết scan')
        } else if (response.data) {
          setData(response.data)
        }
      } catch {
        setError('Đã xảy ra lỗi khi tải chi tiết scan')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetail()
  }, [open, scanId])

  if (!data && !isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-[var(--radius-card)] bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
              <EyeIcon className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-[var(--text-heading)]">Chi tiết scan</DialogTitle>
              <p className="text-xs text-[var(--text-caption)] mt-0.5">Xem thông tin đầy đủ của bản scan</p>
            </div>
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-[var(--radius-card)] bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
            <EyeIcon className="w-5 h-5 text-[var(--primary)]" />
          </div>
          <div>
            <DialogTitle className="text-lg font-bold text-[var(--text-heading)]">Chi tiết scan</DialogTitle>
            <p className="text-xs text-[var(--text-caption)] mt-0.5">Xem thông tin đầy đủ của bản scan</p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="w-full h-64" />
            <Skeleton className="w-full h-32" />
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* Image preview */}
            <div className="flex gap-4 p-4 rounded-[var(--radius-card)] bg-[var(--surface-elevated)] border border-[var(--border)]">
              <ScanThumbnailCell imageUrl={data.scan.imageUrl} alt="Scan preview" />
              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-[var(--text-caption)]">Người dùng:</span>{' '}
                    <span className="font-medium text-[var(--text-body)]">{data.user?.email || '-'}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-caption)]">Thời gian:</span>{' '}
                    <span className="font-medium text-[var(--text-body)]">
                      {format(new Date(data.scan.timestamp), 'dd/MM/yyyy HH:mm', { locale: vi })}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--text-caption)]">API Key:</span>{' '}
                    <span className="font-mono text-[var(--text-body)]">#{data.scan.apiKeyIndex}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-caption)]">Model:</span>{' '}
                    <Badge variant="outline" className="text-[var(--text-caption)]">{data.scan.modelTier || 'default'}</Badge>
                  </div>
                </div>
                {data.scan.edited && (
                  <Badge variant="secondary">
                    <PencilIcon className="w-3 h-3 mr-1" />
                    Đã chỉnh sửa
                  </Badge>
                )}
              </div>
            </div>

            {/* OCR Title */}
            {data.scan.ocrStructured?.title && (
              <div className="p-4 rounded-[var(--radius-card)] bg-[var(--surface-card)] border border-[var(--border)] shadow-[var(--shadow-card)]">
                <h3 className="text-lg font-bold text-[var(--text-heading)]">{data.scan.ocrStructured.title}</h3>
              </div>
            )}

            {/* OCR Fields */}
            {data.scan.ocrStructured?.fields && data.scan.ocrStructured.fields.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-[var(--text-caption)] uppercase tracking-wide">Thông tin OCR</h4>
                <div className="border border-[var(--border)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[var(--background-muted)] border-b border-[var(--border)]">
                        <TableHead className="w-[150px] text-[var(--text-caption)] text-xs uppercase tracking-wide">Trường</TableHead>
                        <TableHead className="text-[var(--text-caption)] text-xs uppercase tracking-wide">Giá trị</TableHead>
                        <TableHead className="w-[80px] text-[var(--text-caption)] text-xs uppercase tracking-wide">Độ tin cậy</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.scan.ocrStructured.fields.map((field, idx) => (
                        <TableRow key={idx} className="hover:bg-[var(--surface-elevated)] transition-colors border-b border-[var(--border)] last:border-0">
                          <TableCell className="font-medium text-[var(--text-body)]">{field.field}</TableCell>
                          <TableCell className="text-[var(--text-body)]">{field.value}</TableCell>
                          <TableCell>
                            {field.confidence && (
                              <Badge
                                variant={
                                  field.confidence === 'high'
                                    ? 'default'
                                    : field.confidence === 'medium'
                                    ? 'secondary'
                                    : 'destructive'
                                }
                                className="text-xs"
                              >
                                {field.confidence}
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {/* Sizes */}
            {data.scan.ocrStructured?.sizes && data.scan.ocrStructured.sizes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-[var(--text-caption)] uppercase tracking-wide">Kích thước/Số lượng</h4>
                <div className="flex gap-2 flex-wrap">
                  {data.scan.ocrStructured.sizes.map((size, idx) => (
                    <Badge key={idx} variant="outline" className="text-[var(--text-body)]">
                      {size.size}: {size.quantity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Raw Text */}
            {data.scan.ocrStructured?.rawText && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-[var(--text-caption)] uppercase tracking-wide">Raw Text</h4>
                <pre className="p-4 bg-[var(--surface-card)] rounded-[var(--radius-card)] border border-[var(--border)] shadow-[var(--shadow-card)] text-xs font-mono text-[var(--text-body)] whitespace-pre-wrap">
                  {data.scan.ocrStructured.rawText}
                </pre>
              </div>
            )}

            {/* Token Usage */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-[var(--text-caption)] uppercase tracking-wide">Token Usage</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-[var(--surface-card)] rounded-[var(--radius-card)] border border-[var(--border)] shadow-[var(--shadow-card)]">
                  <div className="text-xs text-[var(--text-caption)] mb-1">Input</div>
                  <div className="text-lg font-mono font-bold text-[var(--text-heading)]">{data.scan.tokenUsage?.input?.toLocaleString() || 0}</div>
                </div>
                <div className="p-4 bg-[var(--surface-card)] rounded-[var(--radius-card)] border border-[var(--border)] shadow-[var(--shadow-card)]">
                  <div className="text-xs text-[var(--text-caption)] mb-1">Output</div>
                  <div className="text-lg font-mono font-bold text-[var(--text-heading)]">{data.scan.tokenUsage?.output?.toLocaleString() || 0}</div>
                </div>
                <div className="p-4 bg-[var(--surface-card)] rounded-[var(--radius-card)] border border-[var(--border)] shadow-[var(--shadow-card)]">
                  <div className="text-xs text-[var(--text-caption)] mb-1">Cost</div>
                  <div className="text-lg font-mono font-bold text-[var(--success)]">
                    ${data.scan.tokenUsage?.cost?.toFixed(4) || '0.0000'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}