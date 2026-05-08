'use client'

import type { ScanRecord } from '@/types/scan'

interface OCRSummaryCellProps {
  scan: ScanRecord
}

export function OCRSummaryCell({ scan }: OCRSummaryCellProps) {
  const title = scan.ocrStructured?.title || 'Untitled scan'
  const fieldCount = (scan.ocrStructured?.fields?.length || 0) + (scan.ocrStructured?.sizes?.length || 0)

  return (
    <div className="space-y-0.5">
      <span className="font-medium text-[var(--text-body)] line-clamp-1">{title}</span>
      {fieldCount > 0 && (
        <span className="text-xs text-[var(--text-muted)]">{fieldCount} trường</span>
      )}
    </div>
  )
}