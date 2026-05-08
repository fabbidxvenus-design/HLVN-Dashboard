"use client"

import { User } from "lucide-react"

interface DashboardHeaderProps {
  title: string
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header
      className="fixed top-0 right-0 bg-[var(--surface-elevated)] border-b border-[var(--border)] flex items-center justify-between px-6 z-10"
      style={{
        left: "var(--sidebar-width)",
        height: "var(--header-height)",
      }}
    >
      <h1 className="text-xl font-semibold text-[var(--text-heading)] tracking-tight">
        {title}
      </h1>

      <div className="flex items-center gap-3">
        <button
          className="w-9 h-9 rounded-full bg-[var(--background-muted)] flex items-center justify-center text-[var(--text-body)] hover:bg-[var(--primary)] hover:text-white transition-all duration-[var(--duration-normal)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
          aria-label="User profile"
        >
          <User className="w-[18px] h-[18px]" />
        </button>
      </div>
    </header>
  )
}