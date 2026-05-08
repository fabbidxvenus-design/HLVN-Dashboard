'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import type { UserProfile } from '@/types/user'
import { users } from '@/lib/api/endpoints'
import type { ApiMeta } from '@/types/api'

interface UseUsersQueryOptions {
  onError?: (error: string) => void
}

export function useUsersQuery({ onError }: UseUsersQueryOptions = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // URL state
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '20', 10)
  const search = searchParams.get('search') || ''
  const role = (searchParams.get('role') || 'all') as string
  const sortBy = searchParams.get('sortBy') || 'email'
  const sortOrder = searchParams.get('sortOrder') || 'asc'

  // Local state
  const [usersList, setUsersList] = useState<UserProfile[]>([])
  const [meta, setMeta] = useState<ApiMeta | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Use ref to avoid recreating fetchUsers on every render
  const onErrorRef = useRef(onError)
  onErrorRef.current = onError

  // Stable query params string to use as dep
  const queryParams = `${page}|${limit}|${search}|${role}|${sortBy}|${sortOrder}`

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await users.list({ page, limit, search, role, sortBy, sortOrder })

      if (!response.success) {
        setError(response.error)
        onErrorRef.current?.(response.error)
        return
      }

      setUsersList(response.data)
      setMeta(response.meta || null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải danh sách người dùng.'
      setError(message)
      onErrorRef.current?.(message)
    } finally {
      setIsLoading(false)
    }
  }, [queryParams]) // use stable string instead of individual params

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

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
    if ('search' in updates || 'role' in updates) {
      params.delete('page')
    }

    router.push(`${pathname}?${params.toString()}`)
  }, [pathname, router, searchParams])

  const setSearch = (value: string) => updateParams({ search: value })
  const setRole = (value: string) => updateParams({ role: value })
  const setPage = (value: number) => updateParams({ page: value })
  const setSorting = (sortBy: string, sortOrder: string) => updateParams({ sortBy, sortOrder })
  const clearFilters = () => router.push(pathname)

  return {
    // Data
    users: usersList,
    meta,
    isLoading,
    error,

    // URL state
    page,
    limit,
    search,
    role,
    sortBy,
    sortOrder,

    // Actions
    refetch: fetchUsers,
    setSearch,
    setRole,
    setPage,
    setSorting,
    clearFilters,
  }
}