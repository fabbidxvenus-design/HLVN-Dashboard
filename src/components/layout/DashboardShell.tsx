import { Outlet } from 'react-router'
import { AppSidebar } from './AppSidebar'
import { DashboardHeader } from './DashboardHeader'
import { useAdminNotifications } from '@/hooks/use-admin-notifications'

export function DashboardShell() {
  useAdminNotifications()

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}