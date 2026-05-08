import { analytics as analyticsEndpoints } from './endpoints'

// Re-export for convenience
export { analytics } from './endpoints'

// Type-safe wrappers for analytics with extended params
export const analyticsApi = {
  summary: (from?: string, to?: string) =>
    analyticsEndpoints.summary(from, to),

  trends: (range: '7d' | '30d', from?: string, to?: string) =>
    analyticsEndpoints.trends(range, from, to),

  topProducts: (from?: string, to?: string, limit = 10) =>
    analyticsEndpoints.topProducts(from, to, limit),

  topUsers: (from?: string, to?: string, limit = 10) =>
    analyticsEndpoints.topUsers(from, to, limit),

  apiUsage: (from?: string, to?: string) =>
    analyticsEndpoints.apiUsage(from, to),
}