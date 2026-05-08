'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import type { ScanRecord } from '@/types/scan'
import { scans as scansEndpoints } from '@/lib/api/endpoints'
import type { ApiMeta } from '@/types/api'

interface UseScansQueryOptions {
  onError?: (error: string) => void
}

export function useScansQuery({ onError }: UseScansQueryOptions = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // URL state
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '20', 10)
  const search = searchParams.get('search') || ''
  const userId = searchParams.get('userId') || 'all'
  const dateFrom = searchParams.get('from') || ''
  const dateTo = searchParams.get('to') || ''
  const sortBy = searchParams.get('sortBy') || 'timestamp'
  const sortOrder = searchParams.get('sortOrder') || 'desc'

  // Local state
  const [scansList, setScansList] = useState<ScanRecord[]>([])
  const [meta, setMeta] = useState<ApiMeta | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Use ref to avoid recreating fetchScans on every render
  const onErrorRef = useRef(onError)
  onErrorRef.current = onError

  // Stable query params string to use as dep
  const queryParams = `${page}|${limit}|${search}|${userId}|${dateFrom}|${dateTo}|${sortBy}|${sortOrder}`

  // Fetch scans
  const fetchScans = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await scansEndpoints.list({
        page,
        limit,
        search: search || undefined,
        userId: userId !== 'all' ? userId : undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
        sortBy,
        sortOrder,
      })

      if (!response.success) {
        setError(response.error)
        onErrorRef.current?.(response.error)
        return
      }

      setScansList(response.data)
      setMeta(response.meta || null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải danh sách scan.'
      setError(message)
      onErrorRef.current?.(message)
    } finally {
      setIsLoading(false)
    }
  }, [queryParams]) // use stable string instead of individual params

  useEffect(() => {
    fetchScans()
  }, [fetchScans])

  // URL update helpers
  const updateParams = useCallback((updates: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        params.delete(key)
      } else {
        params.set(key, String(value))
      }
    })

    // Reset to page 1 when filter changes
    if ('search' in updates || 'userId' in updates || 'from' in updates || 'to' in updates) {
      params.delete('page')
    }

    router.push(`${pathname}?${params.toString()}`)
  }, [pathname, router, searchParams])

  const setSearch = (value: string) => updateParams({ search: value })
  const setUserId = (value: string) => updateParams({ userId: value })
  const setDateFrom = (value: string) => updateParams({ from: value })
  const setDateTo = (value: string) => updateParams({ to: value })
  const setPage = (value: number) => updateParams({ page: value })
  const setSorting = (sortBy: string, sortOrder: string) => updateParams({ sortBy, sortOrder })
  const clearFilters = () => {
    router.push(pathname)
  }

  return {
    // Data
    scans: scansList,
    meta,
    isLoading,
    error,

    // URL state
    page,
    limit,
    search,
    userId,
    dateFrom,
    dateTo,
    sortBy,
    sortOrder,

    // Actions
    refetch: fetchScans,
    setSearch,
    setUserId,
    setDateFrom,
    setDateTo,
    setPage,
    setSorting,
    clearFilters,
  }
}