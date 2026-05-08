import { scans as scansEndpoints } from './endpoints'
import type { ScanRecord } from '@/types/scan'
import type { UserProfile } from '@/types/user'

// Re-export for convenience
export { scans } from './endpoints'

// Type-safe wrappers for scans with extended params
export const scansApi = {
  list: (params?: {
    page?: number
    limit?: number
    search?: string
    userId?: string
    dateFrom?: string
    dateTo?: string
    sortBy?: string
    sortOrder?: string
  }) => scansEndpoints.list(params),

  detail: (id: string) => scansEndpoints.detail(id),

  delete: (id: string) => scansEndpoints.delete(id),
}

export const scanTypes = {
  isValidScan: (scan: unknown): scan is ScanRecord => {
    if (!scan || typeof scan !== 'object') return false
    const s = scan as Record<string, unknown>
    return (
      typeof s.id === 'string' &&
      typeof s.userId === 'string' &&
      typeof s.imageUrl === 'string' ||
      s.imageUrl === null
    )
  },

  formatTokenUsage: (input: number, output: number, cost: number): string => {
    return `In: ${input} | Out: ${output} | $${cost.toFixed(4)}`
  },

  getOcrTitle: (ocr: ScanRecord['ocrStructured']): string => {
    if (ocr.title) return ocr.title
    if (ocr.fields && ocr.fields.length > 0) {
      return ocr.fields[0].value || 'Untitled scan'
    }
    return 'Untitled scan'
  },

  getFieldCount: (ocr: ScanRecord['ocrStructured']): number => {
    const fields = ocr.fields?.length || 0
    const sizes = ocr.sizes?.length || 0
    return fields + sizes
  },
}