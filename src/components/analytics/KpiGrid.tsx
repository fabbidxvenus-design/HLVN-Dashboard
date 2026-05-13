import { KpiCard } from './KpiCard'
import { Scan, Users, CheckCircle, Activity } from 'lucide-react'
import type { KpiData } from '../../types'

interface KpiGridProps {
  data?: KpiData
  loading?: boolean
}

export function KpiGrid({ data, loading }: KpiGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Lượt quét"
        value={data?.totalScans.toLocaleString('vi-VN') ?? '—'}
        trend={data?.scansTrend}
        icon={<Scan className="h-5 w-5" />}
        loading={loading}
      />
      <KpiCard
        title="Người dùng"
        value={data?.totalUsers.toLocaleString('vi-VN') ?? '—'}
        trend={data?.usersTrend}
        icon={<Users className="h-5 w-5" />}
        loading={loading}
      />
      <KpiCard
        title="Tỷ lệ thành công"
        value={data ? `${data.successRate.toFixed(1)}%` : '—'}
        trend={data?.successRateTrend}
        icon={<CheckCircle className="h-5 w-5" />}
        loading={loading}
      />
      <KpiCard
        title="Người dùng tích cực"
        value={data?.activeToday.toLocaleString('vi-VN') ?? '—'}
        trend={data?.activeTodayTrend}
        icon={<Activity className="h-5 w-5" />}
        loading={loading}
      />
    </div>
  )
}