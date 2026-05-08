'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { AnalyticsKpis, ScanTrendPoint, TopProduct, TopUser, ApiUsageRow } from '@/types/analytics'
import { analytics as analyticsEndpoints } from '@/lib/api/endpoints'

interface UseAnalyticsQueryOptions {
  onError?: (error: string) => void
}

export function useAnalyticsQuery({ onError }: UseAnalyticsQueryOptions = {}) {
  const [range, setRange] = useState<'7d' | '30d'>('7d')

  // Data state
  const [kpis, setKpis] = useState<AnalyticsKpis | null>(null)
  const [trends, setTrends] = useState<ScanTrendPoint | null>(null)
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [topUsers, setTopUsers] = useState<TopUser[]>([])
  const [apiUsage, setApiUsage] = useState<ApiUsageRow[]>([])

  // Loading/error state
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Use ref to avoid recreating fetchAll on every render
  const onErrorRef = useRef(onError)
  onErrorRef.current = onError

  const fetchAll = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Fetch all analytics data in parallel
      const [summaryRes, trendsRes, productsRes, usersRes, usageRes] = await Promise.all([
        analyticsEndpoints.summary(),
        analyticsEndpoints.trends(range),
        analyticsEndpoints.topProducts(undefined, undefined, 10),
        analyticsEndpoints.topUsers(undefined, undefined, 10),
        analyticsEndpoints.apiUsage(),
      ])

      // Handle summary
      if (summaryRes.success && summaryRes.data) {
        setKpis(summaryRes.data)
      }

      // Handle trends
      if (trendsRes.success && trendsRes.data) {
        setTrends(trendsRes.data)
      }

      // Handle top products
      if (productsRes.success && productsRes.data) {
        setTopProducts(productsRes.data)
      }

      // Handle top users
      if (usersRes.success && usersRes.data) {
        setTopUsers(usersRes.data)
      }

      // Handle API usage
      if (usageRes.success && usageRes.data) {
        setApiUsage(usageRes.data.byApiKey)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải analytics.'
      setError(message)
      onErrorRef.current?.(message)
    } finally {
      setIsLoading(false)
    }
  }, [range])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return {
    // Data
    kpis,
    trends,
    topProducts,
    topUsers,
    apiUsage,

    // State
    range,
    isLoading,
    error,

    // Actions
    setRange,
    refetch: fetchAll,
  }
}