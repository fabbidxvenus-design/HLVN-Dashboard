// Formatting helpers for analytics display

export function formatNumber(value: number | undefined | null): string {
  return (value ?? 0).toLocaleString('vi-VN')
}

export function formatCurrency(value: number | undefined | null): string {
  return `$${(value ?? 0).toFixed(2)}`
}

export function formatPercent(value: number | undefined | null): string {
  return `${(value ?? 0).toFixed(1)}%`
}

export function formatCompactNumber(value: number | undefined | null): string {
  const v = value ?? 0
  if (v >= 1000000) {
    return `${(v / 1000000).toFixed(1)}M`
  }
  if (v >= 1000) {
    return `${(v / 1000).toFixed(1)}K`
  }
  return v.toLocaleString('vi-VN')
}

export function formatCompactDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' })
}