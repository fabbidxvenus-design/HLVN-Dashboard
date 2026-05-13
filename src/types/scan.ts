export interface Scan {
  id: string
  user_id: string
  user_email: string
  product: string
  ocr_text: string
  confidence: number
  ocr_structured?: unknown
  structured?: unknown
  metadata?: unknown
  fields?: unknown
  image_url: string | null
  status: 'success' | 'failed' | 'pending'
  created_at: string
  updated_at: string
}

export interface ScanFilters {
  search: string
  status: string
  dateFrom: string
  dateTo: string
  page: number
  limit: number
}

export interface KpiData {
  totalScans: number
  totalUsers: number
  successRate: number
  activeToday: number
  scansTrend: number
  usersTrend: number
  successRateTrend: number
  activeTodayTrend: number
}

export interface ChartDataPoint {
  date: string
  scans: number
  users: number
}

export interface TopProduct {
  product: string
  count: number
  percentage: number
}

export interface TopUser {
  userId: string
  email: string
  count: number
  percentage: number
  display_name: string | null
  company: string | null
  department: string | null
  avatar_url: string | null
}