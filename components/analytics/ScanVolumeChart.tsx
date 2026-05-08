'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { ScanTrendPoint } from '@/types/analytics'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp } from 'lucide-react'

interface ScanVolumeChartProps {
  data?: ScanTrendPoint
  isLoading?: boolean
}

export function ScanVolumeChart({ data, isLoading }: ScanVolumeChartProps) {
  if (isLoading) {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-card)] p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-[var(--radius-xs)] bg-[var(--background-muted)] animate-pulse" />
          <div className="h-4 w-28 bg-[var(--background-muted)] rounded animate-pulse" />
        </div>
        <Skeleton className="w-full h-[240px]" />
      </div>
    )
  }

  if (!data || !data.labels || data.labels.length === 0) {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-card)] p-8 flex flex-col items-center justify-center gap-3 min-h-[240px]">
        <div className="w-12 h-12 rounded-full bg-[var(--background-muted)] flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-[var(--text-caption)]" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-[var(--text-body)] mb-1">Không có dữ liệu xu hướng</p>
          <p className="text-xs text-[var(--text-caption)]">Dữ liệu scan sẽ xuất hiện sau khi hệ thống hoạt động</p>
        </div>
      </div>
    )
  }

  // Transform data for Recharts
  const chartData = data.labels.map((label, idx) => ({
    label,
    scans: data.scans[idx] || 0,
    tokens: data.tokens?.[idx] || 0,
    users: data.users?.[idx] || 0,
  }))

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-card)] p-6">
      {/* Chart header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 rounded-[var(--radius-xs)] bg-[var(--primary)]/10 flex items-center justify-center">
          <TrendingUp className="w-3.5 h-3.5 text-[var(--primary)]" />
        </div>
        <h3 className="text-base font-semibold text-[var(--text-heading)]">Xu hướng scans</h3>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={chartData} margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: 'var(--text-caption)' }}
            tickLine={false}
            axisLine={{ stroke: 'var(--border)' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'var(--text-caption)' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-card)',
              fontSize: '12px',
              boxShadow: 'var(--shadow-elevated)',
            }}
            labelStyle={{ color: 'var(--text-heading)', fontWeight: 600, marginBottom: 4 }}
            itemStyle={{ color: 'var(--text-body)' }}
          />
          <Line
            type="monotone"
            dataKey="scans"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={{ fill: 'var(--primary)', strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, fill: 'var(--primary)', strokeWidth: 2, stroke: 'var(--surface-elevated)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}