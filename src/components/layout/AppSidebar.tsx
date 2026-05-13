import { NavLink } from 'react-router'
import {
  LayoutDashboard,
  Scan,
  Users,
  BarChart3,
  ShieldCheck,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/scans', icon: Scan, label: 'Scans' },
  { to: '/users', icon: Users, label: 'Users' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
]

export function AppSidebar() {
  const { logout } = useAuth()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-[var(--color-surface-container)] flex flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-[var(--color-surface-container)]">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[var(--color-primary)]">
          <ShieldCheck className="w-5 h-5 text-[var(--color-on-primary)]" />
        </div>
        <span className="font-headline font-bold text-lg text-on-surface">
          HLVN
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'text-[var(--color-primary)] bg-[var(--color-surface-container-low)]'
                  : 'text-on-surface-variant hover:bg-[var(--color-surface-container-low)] hover:text-on-surface'
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-[var(--color-primary)]" />
                )}
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer with logout */}
      <div className="px-3 py-4 border-t border-[var(--color-surface-container)]">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium text-on-surface-variant hover:bg-[var(--color-surface-container-low)] hover:text-on-surface transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign out</span>
        </button>
        <p className="mt-3 px-3 text-xs text-on-surface-variant font-label">
          HLVN Dashboard v0.1.0
        </p>
      </div>
    </aside>
  )
}