import { Search } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { isAdminRole } from '@/types'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { NotificationBell } from '@/components/notifications/NotificationBell'
import { NotificationPanel } from '@/components/notifications/NotificationPanel'
import { useNotificationStore, getUnreadNotificationCount, getSortedNotifications } from '@/stores/notification-store'

export function DashboardHeader() {
  const { user } = useAuth()
  const items = useNotificationStore((s) => s.items)
  const isOpen = useNotificationStore((s) => s.isOpen)
  const connected = useNotificationStore((s) => s.connected)
  const error = useNotificationStore((s) => s.error)
  const openPanel = useNotificationStore((s) => s.openPanel)
  const closePanel = useNotificationStore((s) => s.closePanel)
  const markAsRead = useNotificationStore((s) => s.markAsRead)
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead)

  const unreadCount = getUnreadNotificationCount(items)
  const sortedItems = getSortedNotifications(items)
  const canUseNotifications = !!user

  return (
    <header className="sticky top-0 z-30 h-16 bg-[var(--color-surface-container-lowest)] border-b border-[var(--color-surface-container)] flex items-center px-6 gap-4">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <input
            type="search"
            placeholder="Search scans, users..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-[var(--color-surface-container)] rounded-md border border-[var(--color-surface-container-high)] text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-1"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3">
        {canUseNotifications && (
          <>
            <NotificationBell
              unreadCount={unreadCount}
              isOpen={isOpen}
              onClick={isOpen ? closePanel : openPanel}
            />
            <NotificationPanel
              isOpen={isOpen}
              items={sortedItems}
              unreadCount={unreadCount}
              connected={connected}
              error={error}
              onClose={closePanel}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
            />
          </>
        )}

        {/* User info */}
        {user && (
          <div className="flex items-center gap-3 pl-3 border-l border-[var(--color-outline-variant)]">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-on-surface leading-tight">
                {user.email}
              </p>
              <Badge
                variant={isAdminRole(user.role) ? 'success' : 'outline'}
                className="mt-0.5"
              >
                {user.role}
              </Badge>
            </div>
            <Avatar fallback={user.email} size="sm" />
          </div>
        )}
      </div>
    </header>
  )
}