import { useState, useEffect, useCallback } from 'react'
import type { Scan } from '../types'

type RealtimeCallback = (payload: { eventType: 'INSERT' | 'UPDATE' | 'DELETE'; new: Scan; old: Scan | null }) => void

export function useRealtimeScans(onEvent: RealtimeCallback) {
  const [connected, setConnected] = useState(false)

  const connect = useCallback(() => {
    // Simulate realtime connection with polling for demo
    const interval = setInterval(() => {
      // Randomly simulate an insert event (10% chance every 10 seconds)
      if (Math.random() < 0.1) {
        const mockScan: Scan = {
          id: `scan-${Date.now()}`,
          user_id: 'user-demo',
          user_email: 'demo@hlvn.com',
          product: 'Demo Product',
          ocr_text: 'Demo OCR text',
          confidence: 0.95,
          image_url: null,
          status: 'success',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        onEvent({ eventType: 'INSERT', new: mockScan, old: null })
      }
    }, 10000)

    setConnected(true)
    return () => clearInterval(interval)
  }, [onEvent])

  useEffect(() => {
    const cleanup = connect()
    return () => {
      cleanup?.()
      setConnected(false)
    }
  }, [connect])

  return { connected }
}