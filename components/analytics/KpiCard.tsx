'use client'

import type { AnalyticsKpis } from '@/types/analytics'
import { formatNumber, formatCurrency, formatPercent } from '@/lib/format'
import { Skeleton } from '@/components/ui/skeleton'

interface KpiCardProps {
  label: string
  value: number | string
  tone?: 'default' | 'success' | 'warning' | 'error'
  format?: 'number' | 'currency' | 'percent'
  helperText?: string
  isLoading?: boolean
}

export function KpiCard({ label, value, tone = 'default', format = 'number', helperText, isLoading }: KpiCardProps) {
  const formattedValue = typeof value === 'string'
    ? value
    : format === 'currency'
    ? formatCurrency(value)
    : format === 'percent'
    ? formatPercent(value)
    : formatNumber(value)

  const toneClasses = {
    default: 'text-[var(--text-heading)]',
    success: 'text-[var(--success)]',
    warning: 'text-[var(--warning)]',
    error: 'text-[var(--error)]',
  }

  if (isLoading) {
    return (
      <div className="h-[120px] p-[var(--space-inline)] border border-[var(--border)] rounded-[var(--radius-card)] bg-[var(--surface-card)] shadow-[var(--shadow-card)]">
        <div className="animate-pulse flex flex-col justify-between h-full">
          <div className="h-3.5 w-24 bg-[var(--background-muted)] rounded-[var(--radius-xs)]" />
          <div className="h-9 w-28 bg-[var(--background-muted)] rounded-[var(--radius-xs)]" />
          <div className="h-3 w-20 bg-[var(--background-muted)] rounded-[var(--radius-xs)]" />
        </div>
      </div>
    )
  }

  return (
    <div className="h-[120px] p-[var(--space-inline)] border border-[var(--border)] rounded-[var(--radius-card)] bg-[var(--surface-card)] shadow-[var(--shadow-card)] flex flex-col justify-between">
      <div className="text-sm text-[var(--text-caption)] font-medium">{label}</div>
      <div className={`text-[28px] font-bold leading-tight tracking-tight ${toneClasses[tone]}`}>
        {formattedValue}
      </div>
      {helperText && (
        <div className="text-xs text-[var(--text-caption)]">{helperText}</div>
      )}
    </div>
  )
}