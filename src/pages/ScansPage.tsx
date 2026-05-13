import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
import { Button } from '../components/ui/button'
import { ScanFiltersBar } from '../components/scans/ScanFiltersBar'
import { ScansTable } from '../components/scans/ScansTable'
import { ScanDetailDialog } from '../components/scans/ScanDetailDialog'
import { DeleteScanDialog } from '../components/scans/DeleteScanDialog'
import { api } from '../lib/api'
import { mapScan } from '../lib/api-adapters'
import { useNotificationStore } from '../stores/notification-store'
import { useAuth } from '../hooks/use-auth'
import { isAdminRole, type Scan, type ScanFilters } from '../types'
import type { NotificationItem } from '../types/notification'

const PAGE_SIZE = 10

export function ScansPage() {
  const { user } = useAuth()
  const isAdmin = isAdminRole(user?.role)
  const [scans, setScans] = useState<Scan[]>([])
  const [totalScans, setTotalScans] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ScanFilters>({
    search: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    page: 1,
    limit: PAGE_SIZE,
  })
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null)
  const [deleteScan, setDeleteScan] = useState<Scan | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchScans() {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams({
        page: String(filters.page),
        limit: String(filters.limit),
      })

      if (filters.search) params.set('search', filters.search)
      if (filters.dateFrom) params.set('from', filters.dateFrom)
      if (filters.dateTo) params.set('to', filters.dateTo)

      try {
        const response = await api.get<unknown[]>(`/scans?${params.toString()}`)
        if (!response.success || !response.data) {
          throw new Error(response.error || 'Không thể tải danh sách lượt quét')
        }

        const mapped = response.data.map((scan) => mapScan(scan as Record<string, unknown>))
        const filtered = filters.status
          ? mapped.filter((scan) => scan.status === filters.status)
          : mapped

        if (!cancelled) {
          setScans(filtered)
          setTotalScans(response.meta?.total ?? filtered.length)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Không thể tải danh sách lượt quét')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchScans()
    return () => { cancelled = true }
  }, [filters])

  const totalPages = Math.max(1, Math.ceil(totalScans / PAGE_SIZE))

  const handleViewScan = async (scan: Scan) => {
    setSelectedScan(scan)
    setDetailOpen(true)
    setDetailLoading(true)
    setDetailError(null)

    try {
      const response = await api.get<unknown>(`/scans/${scan.id}`)
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Không thể tải chi tiết lượt quét')
      }

      setSelectedScan(mapScan(response.data as Record<string, unknown>))
    } catch (err) {
      setDetailError(err instanceof Error ? err.message : 'Không thể tải chi tiết lượt quét')
    } finally {
      setDetailLoading(false)
    }
  }

  const handleDeleteClick = (scan: Scan) => {
    setDeleteScan(scan)
    setDeleteOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteScan) return
    setDeleting(true)
    try {
      const response = await api.delete(`/scans/${deleteScan.id}`)
      if (!response.success) {
        throw new Error(response.error || 'Không thể xóa lượt quét')
      }
      setScans((prev) => prev.filter((scan) => scan.id !== deleteScan.id))
      setTotalScans((prev) => Math.max(0, prev - 1))

      if (isAdmin) {
        const notification: NotificationItem = {
          id: `scan-deleted:${deleteScan.id}`,
          type: 'scan_deleted',
          title: 'Đã xóa lượt quét',
          description: `Lượt quét ${deleteScan.product || 'không rõ sản phẩm'} đã bị xóa`,
          createdAt: new Date().toISOString(),
          read: false,
          href: '/scans',
          severity: 'warning',
        }
        useNotificationStore.getState().addNotification(notification)
      }

      setDeleteScan(null)
      setDeleteOpen(false)
    } finally {
      setDeleting(false)
    }
  }

  const handleExport = async () => {
    const params = new URLSearchParams()
    if (filters.search) params.set('search', filters.search)
    if (filters.dateFrom) params.set('from', filters.dateFrom)
    if (filters.dateTo) params.set('to', filters.dateTo)

    const token = localStorage.getItem('accessToken')
    const response = await fetch(`/api/export/excel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(Object.fromEntries(params)),
    })

    if (!response.ok) {
      throw new Error('Không thể xuất file')
    }

    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `scans-${new Date().toISOString().split('T')[0]}.xlsx`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold text-[var(--color-on-surface)]">
            Lượt quét
          </h1>
          <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">
            Quản lý và xem lịch sử các lượt quét
          </p>
        </div>
        <Button variant="outlined" onClick={handleExport}>
          <Download className="h-4 w-4" />
          Xuất Excel
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-[var(--color-error)] bg-[var(--color-error-container)]/20 p-3 text-sm text-[var(--color-error)]">
          {error}
        </div>
      )}

      <ScanFiltersBar filters={filters} onFiltersChange={setFilters} />

      <ScansTable
        scans={scans}
        loading={loading}
        onView={handleViewScan}
        onDelete={handleDeleteClick}
        canDelete={true}
        actionLoading={detailLoading}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--color-on-surface-variant)]">
            Trang {filters.page} / {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outlined"
              size="icon"
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
              disabled={filters.page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-[var(--color-on-surface)]">
              {filters.page}
            </span>
            <Button
              variant="outlined"
              size="icon"
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
              disabled={filters.page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <ScanDetailDialog
        scan={selectedScan}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        loading={detailLoading}
        error={detailError}
      />
      <DeleteScanDialog
        scan={deleteScan}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
      />
    </div>
  )
}
