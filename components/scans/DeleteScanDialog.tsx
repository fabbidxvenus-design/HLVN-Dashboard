'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { ScanRecord } from '@/types/scan'
import { scans as scansEndpoints } from '@/lib/api/endpoints'

interface DeleteScanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  scan: ScanRecord | null
  onSuccess: () => void
}

export function DeleteScanDialog({ open, onOpenChange, scan, onSuccess }: DeleteScanDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onDelete = async () => {
    if (!scan) return

    setIsSubmitting(true)
    try {
      const response = await scansEndpoints.delete(scan.id)

      if (!response.success) {
        toast.error(response.error)
        return
      }

      toast.success('Xóa scan thành công')
      onOpenChange(false)
      onSuccess()
    } catch (err) {
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa scan</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-[var(--text-secondary)]">
            Bạn có chắc chắn muốn xóa scan này? Hành động này không thể hoàn tác.
          </p>

          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm">
            <span className="font-medium text-destructive">ID:</span> {scan?.id}
          </div>
        </div>

        <DialogFooter showCloseButton>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Hủy
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            disabled={isSubmitting}
          >
            {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang xóa...</> : 'Xóa scan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}