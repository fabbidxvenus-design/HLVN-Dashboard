import { useEffect, useRef } from 'react'
import { useAuth } from './use-auth'
import { api } from '../lib/api'
import { mapScan } from '../lib/api-adapters'
import { useNotificationStore } from '../stores/notification-store'
import type { NotificationItem } from '../types/notification'
import { isAdminRole, type Scan } from '../types'

const POLL_INTERVAL_MS = 15_000
const SCAN_NOTIFICATION_LIMIT = 5

function createScanNotification(scan: Scan): NotificationItem {
  const product = scan.product && scan.product !== 'Không rõ sản phẩm'
    ? scan.product
    : 'sản phẩm chưa xác định'

  return {
    id: `scan-created:${scan.id}`,
    type: 'scan_created',
    title: 'Có lượt quét mới',
    description: `${scan.user_email} vừa quét ${product}`,
    createdAt: scan.created_at,
    read: false,
    href: '/scans',
    severity: scan.status === 'failed' ? 'error' : 'info',
  }
}

export function useAdminNotifications() {
  const { user, isAuthenticated } = useAuth()
  const addNotification = useNotificationStore((state) => state.addNotification)
  const setConnected = useNotificationStore((state) => state.setConnected)
  const setError = useNotificationStore((state) => state.setError)
  const seenScanIdsRef = useRef<Set<string>>(new Set())
  const hydratedRef = useRef(false)
  const pollingRef = useRef(false)

  useEffect(() => {
    seenScanIdsRef.current = new Set()
    hydratedRef.current = false

    if (!isAuthenticated || !isAdminRole(user?.role)) {
      setConnected(false)
      return undefined
    }

    let cancelled = false
    let intervalId: number | undefined

    async function pollLatestScans() {
      if (pollingRef.current) return
      pollingRef.current = true

      try {
        const response = await api.get<unknown[]>(`/scans?page=1&limit=${SCAN_NOTIFICATION_LIMIT}`)
        if (!response.success || !response.data) {
          throw new Error(response.error || 'Không thể tải thông báo')
        }

        const scans = response.data.map((item) => mapScan(item as Record<string, unknown>))
        if (cancelled) return

        setConnected(true)
        setError(null)

        if (!hydratedRef.current) {
          seenScanIdsRef.current = new Set(scans.map((scan) => scan.id).filter(Boolean))
          hydratedRef.current = true
          return
        }

        for (const scan of scans) {
          if (!scan.id || seenScanIdsRef.current.has(scan.id)) continue
          seenScanIdsRef.current = new Set([...seenScanIdsRef.current, scan.id])
          addNotification(createScanNotification(scan))
        }
      } catch {
        if (!cancelled) {
          setConnected(false)
          setError('Không thể tải thông báo')
        }
      } finally {
        pollingRef.current = false
      }
    }

    void pollLatestScans()
    intervalId = window.setInterval(() => { void pollLatestScans() }, POLL_INTERVAL_MS)

    return () => {
      cancelled = true
      if (intervalId) window.clearInterval(intervalId)
      pollingRef.current = false
    }
  }, [addNotification, isAuthenticated, setConnected, setError, user])
}
