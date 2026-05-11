'use client'

import type { ScanRecord } from '@/types/scan'
import { vi } from 'date-fns/locale'
import { format } from 'date-fns'

interface TokenUsageCellProps {
  scan: ScanRecord
}

export function TokenUsageCell({ scan }: TokenUsageCellProps) {
  const { input = 0, output = 0, cost = 0 } = scan.tokenUsage || {}

  return (
    <div className="font-mono text-xs text-[var(--text-body)]">
      <div>In: {(input ?? 0).toLocaleString()}</div>
      <div>Out: {(output ?? 0).toLocaleString()}</div>
      <div className="text-[var(--success)]">${(cost ?? 0).toFixed(4)}</div>
    </div>
  )
}