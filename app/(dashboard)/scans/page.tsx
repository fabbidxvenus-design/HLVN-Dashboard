'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { DashboardShell } from '@/components/dashboard'
import { ScanDetailDialog } from '@/components/scans/ScanDetailDialog'
import { DeleteScanDialog } from '@/components/scans/DeleteScanDialog'
import { ScanFilters } from '@/components/scans/ScanFilters'
import { ScansTable } from '@/components/scans/ScansTable'
import { useScansQuery } from '@/hooks/useScansQuery'
import { useUsersQuery } from '@/hooks/useUsersQuery'
import type { ScanRecord } from '@/types/scan'
import type { SortingState } from '@tanstack/react-table'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ScansPage() {
  const [detailScanId, setDetailScanId] = useState<string | null>(null)
  const [deleteScan, setDeleteScan] = useState<ScanRecord | null>(null)
  const [isExporting, setIsExporting] = useState(false)

  const {
    scans: scansList,
    meta,
    isLoading,
    error,
    page,
    limit,
    search,
    userId,
    dateFrom,
    dateTo,
    sortBy,
    sortOrder,
    refetch,
    setSearch,
    setUserId,
    setDateFrom,
    setDateTo,
    setPage,
    setSorting,
    clearFilters,
  } = useScansQuery({
    onError: (msg) => toast.error(msg),
  })

  // Fetch users for filter dropdown
  const { users: usersList } = useUsersQuery({ onError: () => {} })

  const handleSortingChange = (updater: SortingState | ((old: SortingState) => SortingState)) => {
    const newSorting = typeof updater === 'function' ? updater([]) : updater
    if (newSorting.length > 0) {
      setSorting(newSorting[0].id, newSorting[0].desc ? 'desc' : 'asc')
    }
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const { exportApi } = await import('@/lib/api/endpoints')
      const response = await exportApi.excel({ from: dateFrom, to: dateTo, userId: userId !== 'all' ? userId : undefined })

      if (!response.success) {
        toast.error(response.error || 'Xuất file thất bại')
        return
      }

      if (response.data?.downloadUrl) {
        window.open(response.data.downloadUrl, '_blank')
        toast.success('Đang tải file xuống...')
      } else {
        toast.success('Xuất file thành công')
      }
    } catch (err) {
      toast.error('Đã xảy ra lỗi khi xuất file')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DashboardShell title="Lịch sử scan">
      <div className="space-y-6">
        {/* Header with Export button */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-[var(--radius-card)] bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[var(--primary)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-[var(--text-heading)] tracking-tight">Lịch sử scan</h1>
              <p className="text-sm text-[var(--text-caption)] mt-0.5">Xem và quản lý lịch sử quét OCR trong hệ thống</p>
            </div>
          </div>
          <Button onClick={handleExport} disabled={isExporting} variant="outline" size="sm" className="sm:shrink-0">
            <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            {isExporting ? 'Đang xuất...' : 'Xuất Excel'}
          </Button>
        </div>

        {/* Filters */}
        <ScanFilters
          search={search}
          userId={userId}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onSearchChange={setSearch}
          onUserChange={setUserId}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
          onClearFilters={clearFilters}
          users={usersList}
        />

        {/* Error state */}
        {error && (
          <Card className="border-destructive">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-destructive">{error}</span>
                <Button variant="outline" size="sm" onClick={refetch} className="hover:bg-[var(--surface-elevated)] transition-colors">
                  Thử lại
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Table */}
        <ScansTable
          scans={scansList}
          isLoading={isLoading}
          page={page}
          limit={limit}
          total={meta?.total || 0}
          sorting={[{ id: sortBy, desc: sortOrder === 'desc' }]}
          onSortingChange={handleSortingChange}
          onPageChange={setPage}
          onViewDetail={(scan) => setDetailScanId(scan.id)}
          onDelete={(scan) => setDeleteScan(scan)}
        />
      </div>

      {/* Dialogs */}
      <ScanDetailDialog
        open={!!detailScanId}
        onOpenChange={(open) => !open && setDetailScanId(null)}
        scanId={detailScanId}
      />

      <DeleteScanDialog
        open={!!deleteScan}
        onOpenChange={(open) => !open && setDeleteScan(null)}
        scan={deleteScan}
        onSuccess={refetch}
      />
    </DashboardShell>
  )
}