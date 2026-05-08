'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { exportApi } from '@/lib/api/endpoints'

interface ExportScansButtonProps {
  filters?: {
    search?: string
    userId?: string
    dateFrom?: string
    dateTo?: string
  }
  disabled?: boolean
}

export function ExportScansButton({ filters, disabled }: ExportScansButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleExport = async () => {
    setIsLoading(true)
    try {
      const response = await exportApi.excel(filters)

      if (!response.success) {
        toast.error(response.error || 'Xuất file thất bại')
        return
      }

      // If backend returns a download URL, navigate to it
      if (response.data?.downloadUrl) {
        window.open(response.data.downloadUrl, '_blank')
        toast.success('Đang tải file xuống...')
      } else {
        toast.success('Xuất file thành công')
      }
    } catch (err) {
      toast.error('Đã xảy ra lỗi khi xuất file')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleExport} disabled={disabled || isLoading} variant="outline">
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Đang xuất...
        </>
      ) : (
        <>
          <Download className="w-4 h-4 mr-2" />
          Xuất Excel
        </>
      )}
    </Button>
  )
}