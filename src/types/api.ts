export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  code?: string
  meta?: {
    total: number
    page: number
    limit: number
  }
}