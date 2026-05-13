import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { ChartDataPoint } from '../../types'

interface AnalyticsChartProps {
  data?: ChartDataPoint[]
  loading?: boolean
}

export function AnalyticsChart({ data, loading }: AnalyticsChartProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-5">
        <div className="mb-4 h-5 w-48 animate-pulse rounded bg-[var(--color-surface-container)]" />
        <div className="h-80 animate-pulse rounded-lg bg-[var(--color-surface-container)]" />
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-5">
      <h3 className="mb-4 font-headline text-lg font-semibold text-[var(--color-on-surface)]">
        Thống kê theo thời gian
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline-variant)" />
            <XAxis
              dataKey="date"
              stroke="var(--color-on-surface-variant)"
              fontSize={12}
              tickFormatter={(value) => {
                const date = new Date(value)
                return `${date.getDate()}/${date.getMonth() + 1}`
              }}
            />
            <YAxis
              stroke="var(--color-on-surface-variant)"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-surface-container-high)',
                border: '1px solid var(--color-outline-variant)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: 'var(--color-on-surface)', fontWeight: 600 }}
              labelFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="scans"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: 'var(--color-primary)' }}
              name="Lượt quét"
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="var(--color-tertiary, #0D9488)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: 'var(--color-tertiary, #0D9488)' }}
              name="Người dùng"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}