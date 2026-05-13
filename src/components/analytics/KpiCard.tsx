import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../../lib/utils'

interface KpiCardProps {
  title: string
  value: string | number
  trend?: number
  icon: React.ReactNode
  loading?: boolean
}

export function KpiCard({ title, value, trend, icon, loading }: KpiCardProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-[var(--color-surface-container)]" />
            <div className="h-8 w-20 animate-pulse rounded bg-[var(--color-surface-container)]" />
          </div>
          <div className="h-10 w-10 animate-pulse rounded-lg bg-[var(--color-surface-container)]" />
        </div>
      </div>
    )
  }

  const isPositive = trend !== undefined && trend >= 0

  return (
    <div className="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--color-on-surface-variant)]">
            {title}
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-[var(--color-on-surface)]">
            {value}
          </p>
          {trend !== undefined && (
            <div className={cn(
              'mt-1 flex items-center gap-1 text-xs font-medium',
              isPositive ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'
            )}>
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{isPositive ? '+' : ''}{trend}% so với tháng trước</span>
            </div>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)]">
          {icon}
        </div>
      </div>
    </div>
  )
}