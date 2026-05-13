import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { ChartDataPoint } from '../../types'

interface ScanVolumeChartProps {
  data?: ChartDataPoint[]
  loading?: boolean
}

export function ScanVolumeChart({ data, loading }: ScanVolumeChartProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-5">
        <div className="mb-4 h-5 w-40 animate-pulse rounded bg-[var(--color-surface-container)]" />
        <div className="h-64 animate-pulse rounded-lg bg-[var(--color-surface-container)]" />
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-5">
      <h3 className="mb-4 font-headline text-lg font-semibold text-[var(--color-on-surface)]">
        Lượt quét theo ngày
      </h3>
      <div className="h-64">
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
            <Line
              type="monotone"
              dataKey="scans"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: 'var(--color-primary)' }}
              name="Lượt quét"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}