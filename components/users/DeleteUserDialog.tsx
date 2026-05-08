'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2, AlertTriangle } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { UserProfile } from '@/types/user'
import { users } from '@/lib/api/endpoints'

interface DeleteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: UserProfile | null
  onSuccess: () => void
}

export function DeleteUserDialog({ open, onOpenChange, user, onSuccess }: DeleteUserDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onDelete = async () => {
    if (!user) return

    setIsSubmitting(true)
    try {
      const response = await users.delete(user.id)

      if (!response.success) {
        toast.error(response.error)
        return
      }

      toast.success('Xóa người dùng thành công')
      onOpenChange(false)
      onSuccess()
    } catch {
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
            <DialogTitle>Xóa người dùng</DialogTitle>
          </div>
          <DialogDescription>
            Hành động này không thể hoàn tác. Tài khoản sẽ bị xóa vĩnh viễn.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-[var(--radius-card)] bg-destructive/5 border border-destructive/20 p-4">
          <p className="text-sm font-medium text-[var(--text-body)] mb-1">Người dùng sẽ bị xóa:</p>
          <p className="text-sm text-[var(--text-caption)] font-mono">{user?.email}</p>
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
            {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang xóa...</> : 'Xóa người dùng'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}