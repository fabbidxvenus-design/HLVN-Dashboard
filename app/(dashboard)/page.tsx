'use client'

import { toast } from 'sonner'
import { Activity, TrendingUp, Users, DollarSign } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { KpiGrid } from '@/components/analytics/KpiGrid'
import { ScanVolumeChart } from '@/components/analytics/ScanVolumeChart'
import { TopProductsTable } from '@/components/analytics/TopProductsTable'
import { useAnalyticsQuery } from '@/hooks/useAnalyticsQuery'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const {
    kpis,
    trends,
    topProducts,
    isLoading,
    error,
    refetch,
  } = useAnalyticsQuery({
    onError: (msg) => toast.error(msg),
  })

  return (
    <DashboardShell title="Dashboard">
      <div className="space-y-[var(--space-section)]">
        {/* Overview header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-[var(--radius-card)] bg-[var(--primary)]/10 flex items-center justify-center">
                <Activity className="w-4 h-4 text-[var(--primary)]" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--text-heading)] tracking-tight">
                Tổng quan
              </h1>
            </div>
            <p className="text-sm text-[var(--text-caption)] ml-9">
              Thống kê hoạt động hệ thống — 7 ngày gần nhất
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--text-caption)] px-3 py-1.5 rounded-[var(--radius-card)] bg-[var(--background-muted)]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Cập nhật real-time</span>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-destructive shrink-0" />
                <span className="text-sm text-[var(--text-body)]">{error}</span>
              </div>
              <Button variant="outline" size="sm" onClick={refetch} className="hover:bg-[var(--surface-elevated)] transition-colors">
                Thử lại
              </Button>
            </CardContent>
          </Card>
        )}

        {/* KPI Grid */}
        <KpiGrid kpis={kpis ?? undefined} isLoading={isLoading} />

        {/* Trend Chart */}
        <ScanVolumeChart data={trends ?? undefined} isLoading={isLoading} />

        {/* Top Products */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-[var(--radius-xs)] bg-[var(--primary)]/10 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-[var(--primary)]" />
            </div>
            <h3 className="text-base font-semibold text-[var(--text-heading)]">
              Top sản phẩm scan nhiều nhất
            </h3>
          </div>
          <TopProductsTable data={topProducts} isLoading={isLoading} limit={10} />
        </section>
      </div>
    </DashboardShell>
  )
}