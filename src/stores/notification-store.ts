import { create } from 'zustand'
import { validateNotification, type NotificationItem } from '../types/notification'

const STORAGE_KEY = 'hlvn:admin-notifications'
const MAX_NOTIFICATIONS = 50

interface PersistedNotificationState {
  items: NotificationItem[]
  lastSeenAt: string | null
}

interface NotificationState {
  items: NotificationItem[]
  isOpen: boolean
  lastSeenAt: string | null
  connected: boolean
  error: string | null
  openPanel: () => void
  closePanel: () => void
  addNotification: (item: NotificationItem) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
  setConnected: (connected: boolean) => void
  setError: (error: string | null) => void
}

function sortNewestFirst(items: NotificationItem[]): NotificationItem[] {
  return [...items].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
}

function capItems(items: NotificationItem[]): NotificationItem[] {
  return sortNewestFirst(items).slice(0, MAX_NOTIFICATIONS)
}

function loadPersistedState(): PersistedNotificationState {
  if (typeof window === 'undefined') return { items: [], lastSeenAt: null }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { items: [], lastSeenAt: null }

    const parsed = JSON.parse(raw) as Partial<PersistedNotificationState>
    const items = Array.isArray(parsed.items)
      ? parsed.items
          .map((item) => validateNotification(item))
          .filter((item): item is NotificationItem => item !== null)
      : []

    return {
      items: capItems(items),
      lastSeenAt: typeof parsed.lastSeenAt === 'string' ? parsed.lastSeenAt : null,
    }
  } catch {
    return { items: [], lastSeenAt: null }
  }
}

function persistState(items: NotificationItem[], lastSeenAt: string | null): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, lastSeenAt }))
  } catch {
    // Persistence is best-effort; in-memory notifications should keep working.
  }
}

const persistedState = loadPersistedState()

export const useNotificationStore = create<NotificationState>((set) => ({
  items: persistedState.items,
  isOpen: false,
  lastSeenAt: persistedState.lastSeenAt,
  connected: false,
  error: null,
  openPanel: () => set({ isOpen: true }),
  closePanel: () => set({ isOpen: false }),
  addNotification: (item) => {
    const validItem = validateNotification(item)
    if (!validItem) return

    set((state) => {
      if (state.items.some((existing) => existing.id === validItem.id)) return state

      const items = capItems([validItem, ...state.items])
      const lastSeenAt = new Date().toISOString()
      persistState(items, lastSeenAt)

      return { items, lastSeenAt }
    })
  },
  markAsRead: (id) => set((state) => {
    const items = state.items.map((item) => (
      item.id === id ? { ...item, read: true } : item
    ))
    persistState(items, state.lastSeenAt)
    return { items }
  }),
  markAllAsRead: () => set((state) => {
    const items = state.items.map((item) => ({ ...item, read: true }))
    persistState(items, state.lastSeenAt)
    return { items }
  }),
  clearAll: () => {
    persistState([], null)
    set({ items: [], lastSeenAt: null })
  },
  setConnected: (connected) => set({ connected }),
  setError: (error) => set({ error }),
}))

export function getUnreadNotificationCount(items: NotificationItem[]): number {
  return items.filter((item) => !item.read).length
}

export function getSortedNotifications(items: NotificationItem[]): NotificationItem[] {
  return sortNewestFirst(items)
}
