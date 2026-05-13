import { Bell } from 'lucide-react'
import { Button } from '../ui/button'

interface NotificationBellProps {
  unreadCount: number
  isOpen: boolean
  onClick: () => void
}

function formatBadgeCount(count: number): string {
  return count > 99 ? '99+' : String(count)
}

export function NotificationBell({ unreadCount, isOpen, onClick }: NotificationBellProps) {
  const ariaLabel = unreadCount > 0
    ? `Thông báo, ${unreadCount} chưa đọc`
    : 'Thông báo'

  return (
    <Button
      type="button"
      variant="text"
      size="icon"
      className="relative text-on-surface-variant hover:text-on-surface"
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls="notification-panel"
      onClick={onClick}
    >
      <Bell className="h-5 w-5" aria-hidden="true" />
      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-error)] px-1.5 text-[10px] font-bold leading-none text-white">
          {formatBadgeCount(unreadCount)}
        </span>
      )}
    </Button>
  )
}
