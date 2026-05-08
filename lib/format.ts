// Formatting helpers for analytics display

export function formatNumber(value: number): string {
  return value.toLocaleString('vi-VN')
}

export function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

export function formatCompactNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toLocaleString('vi-VN')
}

export function formatCompactDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' })
}