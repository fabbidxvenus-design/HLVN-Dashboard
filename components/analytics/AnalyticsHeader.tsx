'use client'

import { BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { AnalyticsKpis } from '@/types/analytics'
import { TopProductsTable } from './TopProductsTable'
import { ScanVolumeChart } from './ScanVolumeChart'
import { KpiGrid } from './KpiGrid'
import type { ScanTrendPoint, TopProduct } from '@/types/analytics'

interface AnalyticsHeaderProps {
  kpis?: AnalyticsKpis
  trends?: ScanTrendPoint
  topProducts?: TopProduct[]
  isLoading?: boolean
  children?: React.ReactNode
}

export function AnalyticsHeader({ kpis, trends, topProducts, isLoading, children }: AnalyticsHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Header with optional actions (like date range picker) */}
      {children && (
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Analytics</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Thống kê và theo dõi hoạt động của hệ thống
            </p>
          </div>
          {children}
        </div>
      )}

      {/* KPI Grid */}
      <KpiGrid kpis={kpis} isLoading={isLoading} />

      {/* Trend Chart */}
      <ScanVolumeChart data={trends} isLoading={isLoading} />

      {/* Top Products */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Top sản phẩm</h3>
        <TopProductsTable data={topProducts} isLoading={isLoading} limit={10} />
      </div>
    </div>
  )
}