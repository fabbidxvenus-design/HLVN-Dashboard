import { useState, useEffect, useCallback } from 'react'
import type { KpiData } from '../types'

type KpiCallback = (data: KpiData) => void

export function useRealtimeKpi(onUpdate: KpiCallback) {
  const [connected, setConnected] = useState(false)

  const connect = useCallback(() => {
    const interval = setInterval(() => {
      // Simulate KPI updates
      if (Math.random() < 0.15) {
        const mockKpi: KpiData = {
          totalScans: 12847 + Math.floor(Math.random() * 10),
          totalUsers: 342,
          successRate: 94.2 + (Math.random() - 0.5) * 0.5,
          activeToday: 28 + Math.floor(Math.random() * 3),
          scansTrend: 12.5,
          usersTrend: 5.2,
          successRateTrend: 2.1,
          activeTodayTrend: -3.8,
        }
        onUpdate(mockKpi)
      }
    }, 8000)

    setConnected(true)
    return () => clearInterval(interval)
  }, [onUpdate])

  useEffect(() => {
    const cleanup = connect()
    return () => {
      cleanup?.()
      setConnected(false)
    }
  }, [connect])

  return { connected }
}