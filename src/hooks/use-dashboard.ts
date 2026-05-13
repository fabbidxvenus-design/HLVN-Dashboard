import { useState, useEffect } from 'react'
import { api } from '../lib/api'
import { mapKpi, mapScan, mapTopProduct, mapTopUser, mapTrendPoint, mapUser } from '../lib/api-adapters'
import type { ApiResponse, ChartDataPoint, KpiData, Scan, TopProduct, TopUser, UserProfile } from '../types'

interface DashboardStats {
  kpi: KpiData
  chartData: ChartDataPoint[]
  topProducts: TopProduct[]
  topUsers: TopUser[]
}

interface TrendsResponse {
  points?: unknown[]
}

interface TopProductsResponse {
  products?: unknown[]
}

interface TopUsersResponse {
  users?: unknown[]
}

const TOP_PRODUCTS_LIMIT = 5
const DASHBOARD_REFRESH_INTERVAL_MS = 15000

function getDefaultRange() {
  const to = new Date()
  to.setHours(23, 59, 59, 999)

  const from = new Date()
  from.setDate(from.getDate() - 30)
  from.setHours(0, 0, 0, 0)

  return {
    from: from.toISOString(),
    to: to.toISOString(),
  }
}

function ensureSuccess<T>(response: ApiResponse<T>): T {
  if (!response.success || !response.data) {
    throw new Error(response.error || 'Không thể tải dữ liệu')
  }
  return response.data
}

function buildTopProductsFromScans(scans: Scan[]): TopProduct[] {
  const counts = scans.reduce<Record<string, number>>((nextCounts, scan) => {
    const product = scan.product.trim()
    if (!product || product === 'Không rõ sản phẩm') return nextCounts
    return {
      ...nextCounts,
      [product]: (nextCounts[product] ?? 0) + 1,
    }
  }, {})

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0)
  if (total === 0) return []

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, TOP_PRODUCTS_LIMIT)
    .map(([product, count]) => ({
      product,
      count,
      percentage: (count / total) * 100,
    }))
}

async function fetchTopProductsFallback(from: string, to: string): Promise<TopProduct[]> {
  const params = new URLSearchParams({
    page: '1',
    limit: '100',
    from,
    to,
  })
  const response = await api.get<unknown[]>(`/scans?${params.toString()}`)
  if (!response.success || !response.data) {
    throw new Error(response.error || 'Không thể tải dữ liệu sản phẩm từ lượt quét')
  }

  return buildTopProductsFromScans(response.data.map((scan) => mapScan(scan as Record<string, unknown>)))
}

async function fetchUserProfiles(): Promise<UserProfile[]> {
  const response = await api.get<unknown[]>('/users?page=1&limit=100')
  if (!response.success || !response.data) return []
  return response.data.map((user) => mapUser(user as Record<string, unknown>))
}

function enrichTopUsers(topUsers: TopUser[], profiles: UserProfile[]): TopUser[] {
  const profileById = new Map(profiles.map((profile) => [profile.id, profile]))

  return topUsers.map((topUser) => {
    const profile = profileById.get(topUser.userId)
    if (!profile) return topUser

    return {
      ...topUser,
      email: profile.email || topUser.email,
      display_name: profile.display_name || topUser.display_name,
      company: profile.company || topUser.company,
      department: profile.department || topUser.department,
      avatar_url: profile.avatar_url || topUser.avatar_url,
    }
  })
}

async function fetchDashboardStats(): Promise<DashboardStats> {
  const { from, to } = getDefaultRange()
  const [summaryRes, trendsRes, productsRes, usersRes] = await Promise.all([
    api.get<Record<string, unknown>>(`/analytics/summary?from=${from}&to=${to}`),
    api.get<TrendsResponse>(`/analytics/trends?from=${from}&to=${to}&bucket=day`),
    api.get<TopProductsResponse>(`/analytics/top-products?from=${from}&to=${to}&limit=5`),
    api.get<TopUsersResponse>(`/analytics/top-users?from=${from}&to=${to}&limit=5`),
  ])

  const summary = ensureSuccess(summaryRes)
  const trends = ensureSuccess(trendsRes)
  const productsData = ensureSuccess(productsRes)
  const usersData = ensureSuccess(usersRes)
  const topProductsRaw = productsData.products ?? []
  const topUsersRaw = usersData.users ?? []
  const chartData = (trends.points ?? []).map((p) => mapTrendPoint(p as Record<string, unknown>))
  const totalProductScans = topProductsRaw.reduce<number>((sum, item) => {
    const r = item as Record<string, unknown>
    return sum + Number(r.count ?? r.scans ?? r.scanCount ?? 0)
  }, 0)
  const totalUserScans = topUsersRaw.reduce<number>((sum, item) => {
    const r = item as Record<string, unknown>
    return sum + Number(r.count ?? r.scans ?? r.scanCount ?? 0)
  }, 0)

  const topProducts = topProductsRaw.length > 0
    ? topProductsRaw.map((item) => mapTopProduct(item as Record<string, unknown>, totalProductScans))
    : await fetchTopProductsFallback(from, to)
  const topUsers = topUsersRaw.map((item) => mapTopUser(item as Record<string, unknown>, totalUserScans))
  const shouldEnrichUsers = topUsers.some((user) => user.userId && user.email.trim().toLowerCase() === 'unknown')
  const userProfiles = shouldEnrichUsers ? await fetchUserProfiles() : []

  return {
    kpi: mapKpi(summary),
    chartData,
    topProducts,
    topUsers: enrichTopUsers(topUsers, userProfiles),
  }
}

export function useDashboard() {
  const [data, setData] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function refreshDashboard(showInitialLoading = false) {
      if (showInitialLoading) {
        setLoading(true)
      } else {
        setRefreshing(true)
      }
      setError(null)

      try {
        const nextData = await fetchDashboardStats()
        if (!cancelled) setData(nextData)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu dashboard')
        }
      } finally {
        if (!cancelled && showInitialLoading) setLoading(false)
        if (!cancelled && !showInitialLoading) setRefreshing(false)
      }
    }

    refreshDashboard(true)
    const intervalId = window.setInterval(() => {
      refreshDashboard(false)
    }, DASHBOARD_REFRESH_INTERVAL_MS)

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [])

  return { data, loading, refreshing, error }
}
