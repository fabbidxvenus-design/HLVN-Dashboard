import { useState, useEffect } from 'react'
import { AnalyticsDateRangePicker } from '../components/analytics/AnalyticsDateRangePicker'
import { AnalyticsChart } from '../components/analytics/AnalyticsChart'
import { ApiUsageTable } from '../components/analytics/ApiUsageTable'
import { api } from '../lib/api'
import { mapApiUsage, mapTrendPoint, type ApiUsageRow } from '../lib/api-adapters'
import type { ChartDataPoint } from '../types'

interface TrendsResponse {
  points?: unknown[]
}

interface ApiUsageResponse {
  keys?: unknown[]
}

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState(() => {
    const to = new Date()
    const from = new Date()
    from.setDate(from.getDate() - 30)
    return {
      days: 30,
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0],
    }
  })
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [apiUsage, setApiUsage] = useState<ApiUsageRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchAnalytics() {
      setLoading(true)
      setError(null)

      try {
        const [trendsRes, usageRes] = await Promise.all([
          api.get<TrendsResponse>(`/analytics/trends?from=${dateRange.from}&to=${dateRange.to}&bucket=day`),
          api.get<ApiUsageResponse>(`/analytics/api-usage?from=${dateRange.from}&to=${dateRange.to}`),
        ])

        if (!trendsRes.success || !trendsRes.data) {
          throw new Error(trendsRes.error || 'Không thể tải dữ liệu biểu đồ')
        }
        if (!usageRes.success || !usageRes.data) {
          throw new Error(usageRes.error || 'Không thể tải dữ liệu API usage')
        }

        if (!cancelled) {
          setChartData((trendsRes.data.points ?? []).map((point) => mapTrendPoint(point as Record<string, unknown>)))
          setApiUsage((usageRes.data.keys ?? []).map((row) => mapApiUsage(row as Record<string, unknown>)))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu phân tích')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchAnalytics()
    return () => { cancelled = true }
  }, [dateRange])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold text-[var(--color-on-surface)]">
            Phân tích
          </h1>
          <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">
            Thống kê và báo cáo chi tiết
          </p>
        </div>
        <AnalyticsDateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {error && (
        <div className="rounded-lg border border-[var(--color-error)] bg-[var(--color-error-container)]/20 p-3 text-sm text-[var(--color-error)]">
          {error}
        </div>
      )}

      <AnalyticsChart data={chartData} loading={loading} />

      <div className="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-5">
        <h3 className="mb-4 font-headline text-lg font-semibold text-[var(--color-on-surface)]">
          API Usage
        </h3>
        <ApiUsageTable data={apiUsage} loading={loading} />
      </div>
    </div>
  )
}
