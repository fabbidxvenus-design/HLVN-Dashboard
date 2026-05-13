import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { AlertTriangle } from 'lucide-react'
import type { Scan } from '../../types'

interface DeleteScanDialogProps {
  scan: Scan | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  loading?: boolean
}

export function DeleteScanDialog({
  scan,
  open,
  onOpenChange,
  onConfirm,
  loading,
}: DeleteScanDialogProps) {
  if (!scan) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Xác nhận xóa</DialogTitle>
        </DialogHeader>

        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-error-container)]">
            <AlertTriangle className="h-5 w-5 text-[var(--color-error)]" />
          </div>
          <div>
            <p className="font-medium text-[var(--color-on-surface)]">
              Bạn có chắc chắn muốn xóa lượt quét này?
            </p>
            <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">
              Lượt quét "{scan.product}" sẽ bị xóa vĩnh viễn.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outlined" onClick={() => onOpenChange(false)} disabled={loading}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={onConfirm} loading={loading}>
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}