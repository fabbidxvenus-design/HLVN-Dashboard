import { KpiGrid } from '../components/analytics/KpiGrid'
import { ScanVolumeChart } from '../components/analytics/ScanVolumeChart'
import { TopProductsTable } from '../components/analytics/TopProductsTable'
import { TopUsersTable } from '../components/analytics/TopUsersTable'
import { useDashboard } from '../hooks/use-dashboard'

export function DashboardPage() {
  const { data, loading, refreshing, error } = useDashboard()

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-[var(--color-error)]">Có lỗi xảy ra</p>
          <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold text-[var(--color-on-surface)]">
            Tổng quan
          </h1>
          <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">
            Chào mừng bạn quay trở lại
          </p>
        </div>
        <div className="rounded-full bg-[var(--color-surface-container)] px-3 py-1 text-xs font-medium text-[var(--color-on-surface-variant)]">
          {refreshing ? 'Đang cập nhật dữ liệu...' : 'Tự cập nhật mỗi 15 giây'}
        </div>
      </div>

      <KpiGrid data={data?.kpi} loading={loading} />

      <ScanVolumeChart data={data?.chartData} loading={loading} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopProductsTable data={data?.topProducts} loading={loading} />
        <TopUsersTable data={data?.topUsers} loading={loading} />
      </div>
    </div>
  )
}