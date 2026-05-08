'use client'

import type { AnalyticsKpis } from '@/types/analytics'
import { KpiCard } from './KpiCard'

interface KpiGridProps {
  kpis?: AnalyticsKpis
  isLoading?: boolean
  variant?: 'default' | 'compact'
}

export function KpiGrid({ kpis, isLoading, variant = 'default' }: KpiGridProps) {
  const cards = [
    {
      label: 'Tổng scans',
      value: kpis?.totalScans ?? 0,
      format: 'number' as const,
      helperText: kpis ? `${kpis.scansThisMonth?.toLocaleString() ?? 0} tháng này` : undefined,
    },
    {
      label: 'Người dùng hoạt động',
      value: kpis?.activeUsers ?? 0,
      format: 'number' as const,
      helperText: kpis ? `${kpis.newUsersThisMonth ?? 0} người mới tháng này` : undefined,
    },
    {
      label: 'Tổng chi phí',
      value: kpis?.totalTokenUsage ? kpis.totalTokenUsage * 0.000002 : 0,
      format: 'currency' as const,
      tone: 'warning' as const,
      helperText: kpis ? `${kpis.averageTokensPerScan ?? 0} tokens/scan trung bình` : undefined,
    },
    {
      label: 'Tỷ lệ thành công',
      value: kpis?.successRate ?? 0,
      format: 'percent' as const,
      tone: 'success' as const,
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      {cards.map((card, idx) => (
        <KpiCard
          key={idx}
          label={card.label}
          value={card.value}
          format={card.format}
          tone={card.tone}
          helperText={card.helperText}
          isLoading={isLoading}
        />
      ))}
    </div>
  )
}