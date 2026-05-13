import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { AlertTriangle } from 'lucide-react'
import type { UserProfile } from '../../types'

interface DeleteUserDialogProps {
  user: UserProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  loading?: boolean
}

export function DeleteUserDialog({
  user,
  open,
  onOpenChange,
  onConfirm,
  loading,
}: DeleteUserDialogProps) {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Xác nhận xóa người dùng</DialogTitle>
        </DialogHeader>

        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-error-container)]">
            <AlertTriangle className="h-5 w-5 text-[var(--color-error)]" />
          </div>
          <div>
            <p className="font-medium text-[var(--color-on-surface)]">
              Bạn có chắc chắn muốn xóa người dùng này?
            </p>
            <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">
              Người dùng "{user.email}" sẽ bị xóa vĩnh viễn cùng với tất cả dữ liệu liên quan.
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