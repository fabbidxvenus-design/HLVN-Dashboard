import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { useEffect } from 'react'
import { DashboardShell } from '@/components/layout/DashboardShell'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ScansPage } from '@/pages/ScansPage'
import { UsersPage } from '@/pages/UsersPage'
import { AnalyticsPage } from '@/pages/AnalyticsPage'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { RoleGuard } from '@/components/auth/RoleGuard'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { Toaster } from '@/components/ui/toaster'
import { useAuth } from '@/hooks/use-auth'

function App() {
  const { loadSession } = useAuth()

  useEffect(() => {
    loadSession()
  }, [loadSession])

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="scans" element={<ScansPage />} />
            <Route
              path="users"
              element={
                <RoleGuard allowedRoles={['admin']}>
                  <UsersPage />
                </RoleGuard>
              }
            />
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ErrorBoundary>
  )
}

export { App }