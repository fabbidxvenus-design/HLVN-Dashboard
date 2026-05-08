'use client'

import { Download, History } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ScansPageHeaderProps {
  onExportClick?: () => void
  isExporting?: boolean
  className?: string
}

export function ScansPageHeader({ onExportClick, isExporting, className }: ScansPageHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${className || ''}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-[var(--radius-card)] bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
          <History className="w-5 h-5 text-[var(--primary)]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-heading)] tracking-tight">
            Lịch sử scan
          </h1>
          <p className="text-sm text-[var(--text-caption)] mt-0.5">
            Xem và quản lý lịch sử quét OCR trong hệ thống
          </p>
        </div>
      </div>
      <Button onClick={onExportClick} disabled={isExporting} variant="outline">
        <Download className="w-4 h-4 mr-2" />
        {isExporting ? 'Đang xuất...' : 'Xuất Excel'}
      </Button>
    </div>
  )
}