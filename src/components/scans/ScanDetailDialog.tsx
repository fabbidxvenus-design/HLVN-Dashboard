import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import type { OcrFieldView } from '../../lib/scan-ocr-classifier'
import { classifyOcrFields } from '../../lib/scan-ocr-classifier'
import type { Scan } from '../../types'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

interface ScanDetailDialogProps {
  scan: Scan | null
  open: boolean
  onOpenChange: (open: boolean) => void
  loading?: boolean
  error?: string | null
}

const statusConfig = {
  success: { variant: 'success' as const, label: 'Thành công' },
  pending: { variant: 'warning' as const, label: 'Đang xử lý' },
  failed: { variant: 'error' as const, label: 'Thất bại' },
}

function formatScanDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'

  return format(date, 'dd/MM/yyyy HH:mm:ss', { locale: vi })
}

function formatConfidence(value: number): string {
  if (!Number.isFinite(value)) return '—'

  return `${(value * 100).toFixed(1)}%`
}

function formatFieldConfidence(value: number | string): string {
  if (typeof value === 'number') return value <= 1 ? `${(value * 100).toFixed(1)}%` : `${value}%`
  return value
}

function getSafeImageUrl(value: string | null): string | null {
  if (!value) return null

  try {
    const url = new URL(value, window.location.origin)
    return url.protocol === 'https:' || url.origin === window.location.origin ? url.href : null
  } catch {
    return null
  }
}

interface OcrFieldSectionProps {
  title: string
  fields: OcrFieldView[]
  emptyText: string
}

function OcrFieldSection({ title, fields, emptyText }: OcrFieldSectionProps) {
  return (
    <section className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="font-medium text-[var(--color-on-surface)]">{title}</h3>
        <span className="text-xs text-[var(--color-on-surface-variant)]">{fields.length} trường</span>
      </div>
      {fields.length === 0 ? (
        <p className="text-sm text-[var(--color-on-surface-variant)]">{emptyText}</p>
      ) : (
        <div className="divide-y divide-[var(--color-outline-variant)]">
          {fields.map((field) => (
            <div key={`${field.label}:${field.value}`} className="py-3 first:pt-0 last:pb-0">
              <p className="text-sm font-medium text-[var(--color-on-surface)]">{field.label}</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-[var(--color-on-surface-variant)]">
                {field.value}
              </p>
              {field.confidence !== undefined && (
                <p className="mt-1 text-xs text-[var(--color-on-surface-variant)]">
                  Tin cậy: {formatFieldConfidence(field.confidence)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export function ScanDetailDialog({ scan, open, onOpenChange, loading, error }: ScanDetailDialogProps) {
  const status = scan ? statusConfig[scan.status] || statusConfig.pending : statusConfig.pending
  const classifiedFields = scan ? classifyOcrFields(scan) : { primary: [], secondary: [] }
  const imageUrl = scan ? getSafeImageUrl(scan.image_url) : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết lượt quét</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {loading && (
            <div className="rounded-lg bg-[var(--color-surface-container)] p-3 text-sm text-[var(--color-on-surface-variant)]">
              Đang tải chi tiết lượt quét...
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-[var(--color-error)] bg-[var(--color-error-container)]/20 p-3 text-sm text-[var(--color-error)]">
              {error}
            </div>
          )}

          {scan ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[var(--color-on-surface-variant)]">Thời gian</p>
                  <p className="mt-1 font-medium text-[var(--color-on-surface)]">
                    {formatScanDate(scan.created_at)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-on-surface-variant)]">Trạng thái</p>
                  <div className="mt-1">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-on-surface-variant)]">Người dùng</p>
                  <p className="mt-1 font-medium text-[var(--color-on-surface)]">{scan.user_email}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-on-surface-variant)]">Độ chính xác</p>
                  <p className="mt-1 font-medium text-[var(--color-on-surface)]">
                    {formatConfidence(scan.confidence)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-[var(--color-on-surface-variant)]">Sản phẩm</p>
                <p className="mt-1 font-medium text-[var(--color-on-surface)]">{scan.product}</p>
              </div>

              <OcrFieldSection
                title="Thông tin chính"
                fields={classifiedFields.primary}
                emptyText="Chưa có trường OCR chính được phân loại"
              />

              <OcrFieldSection
                title="Thông tin khác"
                fields={classifiedFields.secondary}
                emptyText="Không có trường OCR phụ"
              />

              <div>
                <p className="text-sm text-[var(--color-on-surface-variant)]">Nội dung OCR</p>
                <div className="mt-1 max-h-80 overflow-auto rounded-lg bg-[var(--color-surface-container)] p-4">
                  <p className="whitespace-pre-wrap text-sm text-[var(--color-on-surface)]">
                    {scan.ocr_text || 'Không có nội dung'}
                  </p>
                </div>
              </div>

              {imageUrl && (
                <div>
                  <p className="text-sm text-[var(--color-on-surface-variant)]">Hình ảnh</p>
                  <div className="mt-2">
                    <img
                      src={imageUrl}
                      alt="Scan preview"
                      className="max-h-64 rounded-lg border border-[var(--color-outline-variant)]"
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-[var(--color-on-surface-variant)]">Không có dữ liệu lượt quét</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outlined" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}