"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  History,
  BarChart3,
  LogOut,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/users", label: "Người dùng", icon: Users },
  { href: "/scans", label: "Lịch sử scan", icon: History },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="fixed left-0 top-0 h-screen bg-[var(--surface-elevated)] border-r border-[var(--border)] flex flex-col z-10 shadow-[var(--shadow-elevated)]"
      style={{ width: "var(--sidebar-width)" }}
    >
      {/* Brand Block */}
      <div className="h-[var(--header-height)] flex items-center px-4 border-b border-[var(--border)] gap-2.5">
        <div className="w-8 h-8 rounded-[var(--radius-card)] bg-[var(--primary)] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4 text-white" />
        </div>
        <Link href="/" className="text-lg font-semibold text-[var(--text-heading)] tracking-tight hover:text-[var(--primary)] transition-colors">
          HLVN
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-card)] text-sm font-medium transition-all duration-[var(--duration-normal)] outline-none",
                    "focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-1",
                    isActive
                      ? "bg-[var(--primary)]/10 text-[var(--primary)] font-semibold border border-[var(--primary)]/20"
                      : "text-[var(--text-secondary)] hover:bg-[var(--background-muted)] hover:text-[var(--text-body)]"
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Account + Logout */}
      <div className="p-3 border-t border-[var(--border)]">
        <button
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-[var(--radius-card)] text-sm font-medium text-[var(--text-caption)] hover:bg-[var(--background-muted)] hover:text-[var(--text-body)] transition-all duration-[var(--duration-normal)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-1"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  )
}