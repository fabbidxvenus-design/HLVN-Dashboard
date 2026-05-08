export interface AnalyticsKpis {
  totalScans: number
  activeUsers: number
  totalTokenUsage: number
  successRate: number
  averageTokensPerScan: number
  scansThisWeek: number
  scansThisMonth: number
  newUsersThisMonth: number
}

export interface ScanTrendPoint {
  labels: string[]
  scans: number[]
  tokens?: number[]
  users?: number[]
}

export interface TopProduct {
  productName: string
  scanCount: number
  percentage: number
}

export interface TopUser {
  userId: string
  email: string
  scanCount: number
  percentage: number
}

export interface ApiUsageRow {
  apiKeyIndex: number
  tokens: number
  cost: number
  scanCount: number
}