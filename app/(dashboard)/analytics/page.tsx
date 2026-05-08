'use client'

import { toast } from 'sonner'
import { BarChart3 } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { KpiGrid } from '@/components/analytics/KpiGrid'
import { ScanVolumeChart } from '@/components/analytics/ScanVolumeChart'
import { TopProductsTable } from '@/components/analytics/TopProductsTable'
import { TopUsersTable } from '@/components/analytics/TopUsersTable'
import { ApiUsageTable } from '@/components/analytics/ApiUsageTable'
import { AnalyticsDateRangePicker } from '@/components/analytics/AnalyticsDateRangePicker'
import { useAnalyticsQuery } from '@/hooks/useAnalyticsQuery'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AnalyticsPage() {
  const {
    kpis,
    trends,
    topProducts,
    topUsers,
    apiUsage,
    range,
    isLoading,
    error,
    setRange,
    refetch,
  } = useAnalyticsQuery({
    onError: (msg) => toast.error(msg),
  })

  return (
    <DashboardShell title="Analytics">
      <div className="space-y-6">
        {/* Header with date range picker */}
        <div className="flex justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--radius-card)] bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
              <BarChart3 className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-heading)] tracking-tight">Analytics</h1>
              <p className="text-sm text-[var(--text-caption)] mt-0.5">
                Thống kê chi tiết và xu hướng hoạt động
              </p>
            </div>
          </div>
          <AnalyticsDateRangePicker value={range} onChange={(val) => setRange(val as '7d' | '30d')} />
        </div>

        {/* Error state */}
        {error && (
          <Card className="border-destructive">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-destructive">{error}</span>
                <Button variant="outline" size="sm" onClick={refetch} className="hover:bg-[var(--surface-elevated)] transition-colors">
                  Thử lại
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* KPI Grid */}
        <KpiGrid kpis={kpis ?? undefined} isLoading={isLoading} />

        {/* Trend Chart */}
        <ScanVolumeChart data={trends ?? undefined} isLoading={isLoading} />

        {/* Two column section: Top Users + API Usage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-body)] mb-3">Top người dùng</h3>
            <TopUsersTable data={topUsers} isLoading={isLoading} limit={10} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-body)] mb-3">API Usage</h3>
            <ApiUsageTable data={apiUsage} isLoading={isLoading} />
          </div>
        </div>

        {/* Top Products */}
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-body)] mb-3">Top sản phẩm</h3>
          <TopProductsTable data={topProducts} isLoading={isLoading} limit={10} />
        </div>
      </div>
    </DashboardShell>
  )
}