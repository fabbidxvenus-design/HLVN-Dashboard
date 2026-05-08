"use client"

import { ReactNode } from "react"
import { AppSidebar } from "./AppSidebar"
import { DashboardHeader } from "./DashboardHeader"

interface DashboardShellProps {
  children: ReactNode
  title: string
}

export function DashboardShell({ children, title }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[var(--background-app)]">
      <AppSidebar />

      <DashboardHeader title={title} />

      <main
        className="overflow-auto pt-[var(--header-height)]"
        style={{
          marginLeft: "var(--sidebar-width)",
          minHeight: "100vh",
        }}
      >
        <div
          className="px-[var(--space-inline)] py-[var(--space-card)] max-w-[var(--content-max-width)]"
          style={{ minHeight: "calc(100vh - var(--header-height))" }}
        >
          {children}
        </div>
      </main>
    </div>
  )
}