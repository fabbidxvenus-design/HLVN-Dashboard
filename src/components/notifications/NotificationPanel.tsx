import { useEffect, useRef } from 'react'
import { AlertCircle, CheckCircle2, Info, Shield, Trash2, UserPlus, X } from 'lucide-react'
import { useNavigate } from 'react-router'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'
import { isSafeHref, type NotificationItem, type NotificationSeverity, type NotificationType } from '../../types/notification'

interface NotificationPanelProps {
  isOpen: boolean
  items: NotificationItem[]
  unreadCount: number
  connected: boolean
  error: string | null
  onClose: () => void
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
}

const severityClasses: Record<NotificationSeverity, string> = {
  info: 'bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)]',
  success: 'bg-[var(--color-success-container)] text-[var(--color-success)]',
  warning: 'bg-[var(--color-warning-container)] text-[var(--color-warning)]',
  error: 'bg-[var(--color-error-container)] text-[var(--color-error)]',
}

function NotificationIcon({ type, severity }: { type: NotificationType; severity: NotificationSeverity }) {
  const className = 'h-4 w-4'
  if (type === 'scan_deleted') return <Trash2 className={className} aria-hidden="true" />
  if (type === 'user_created') return <UserPlus className={className} aria-hidden="true" />
  if (type === 'role_updated') return <Shield className={className} aria-hidden="true" />
  if (severity === 'error') return <AlertCircle className={className} aria-hidden="true" />
  if (severity === 'success') return <CheckCircle2 className={className} aria-hidden="true" />
  return <Info className={className} aria-hidden="true" />
}

function formatNotificationTime(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'vừa xong'
  return formatDistanceToNow(date, { addSuffix: true, locale: vi })
}

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS))
}

export function NotificationPanel({
  isOpen,
  items,
  unreadCount,
  connected,
  error,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationPanelProps) {
  const navigate = useNavigate()
  const panelRef = useRef<HTMLDivElement>(null)

  // Focus panel on open
  useEffect(() => {
    if (!isOpen) return
    const firstFocusable = panelRef.current
      ? getFocusableElements(panelRef.current)[0]
      : null
    ;(firstFocusable ?? panelRef.current)?.focus()
  }, [isOpen])

  // Escape + outside click + focus trap
  useEffect(() => {
    if (!isOpen) return undefined

    function handlePointerDown(event: PointerEvent) {
      if (!panelRef.current?.contains(event.target as Node)) onClose()
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = getFocusableElements(panelRef.current)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const statusText = error || (connected ? 'Đang theo dõi hoạt động realtime' : 'Đang kết nối thông báo')

  const handleItemClick = (item: NotificationItem) => {
    onMarkAsRead(item.id)
    if (isSafeHref(item.href)) {
      navigate(item.href)
      onClose()
    }
  }

  return (
    <>
      {/* Backdrop — hides background from screen readers */}
      <div className="fixed inset-0 z-40" aria-hidden="true" />

      <section
        id="notification-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Thông báo"
        tabIndex={-1}
        className="fixed right-6 top-16 z-50 flex max-h-[calc(100vh-5rem)] w-[380px] flex-col overflow-hidden rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--color-outline-variant)] p-4">
          <div>
            <h2 className="font-headline text-lg font-semibold text-[var(--color-on-surface)]">
              Thông báo
            </h2>
            <p className={cn(
              'mt-1 text-xs',
              error ? 'text-[var(--color-error)]' : 'text-[var(--color-on-surface-variant)]'
            )}>
              {statusText}
            </p>
          </div>
          <Button type="button" variant="text" size="icon" aria-label="Đóng thông báo" onClick={onClose}>
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {unreadCount > 0 && (
          <div className="border-b border-[var(--color-outline-variant)] px-4 py-3">
            <Button
              type="button"
              variant="text"
              size="sm"
              aria-label="Đánh dấu tất cả thông báo đã đọc"
              onClick={onMarkAllAsRead}
            >
              Đánh dấu tất cả đã đọc
            </Button>
          </div>
        )}

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {unreadCount > 0 ? `${unreadCount} thông báo chưa đọc` : 'Không có thông báo chưa đọc'}
        </div>

        {items.length === 0 ? (
          <div className="flex min-h-40 items-center justify-center p-6 text-center text-sm text-[var(--color-on-surface-variant)]">
            Chưa có thông báo
          </div>
        ) : (
          <ul role="list" aria-label="Danh sách thông báo" className="overflow-y-auto py-2">
            {items.map((item) => (
              <li key={item.id} role="listitem" className="px-2 py-1">
                <button
                  type="button"
                  className={cn(
                    'flex min-h-16 w-full items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-[var(--color-surface-container)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]',
                    !item.read && 'bg-[var(--color-surface-container-low)]'
                  )}
                  aria-label={`${item.title}: ${item.description}, ${item.read ? 'đã đọc' : 'chưa đọc'}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={cn('mt-0.5 rounded-full p-2', severityClasses[item.severity])}>
                    <NotificationIcon type={item.type} severity={item.severity} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-[var(--color-on-surface)]">
                        {item.title}
                      </span>
                      {!item.read && (
                        <span
                          className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-error)]"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-xs text-[var(--color-on-surface-variant)]">
                      {item.description}
                    </span>
                    <span className="mt-2 block text-[11px] text-[var(--color-on-surface-variant)]">
                      {formatNotificationTime(item.createdAt)}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
