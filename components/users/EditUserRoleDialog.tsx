'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Loader2, Pencil } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { UserProfile, UserRole } from '@/types/user'
import { users } from '@/lib/api/endpoints'

const editRoleSchema = z.object({
  role: z.enum(['admin', 'manager', 'user'], { required_error: 'Vui lòng chọn vai trò' }),
})

type EditRoleFormData = z.infer<typeof editRoleSchema>

interface EditUserRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: UserProfile | null
  onSuccess: () => void
}

export function EditUserRoleDialog({ open, onOpenChange, user, onSuccess }: EditUserRoleDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<EditRoleFormData>({
    resolver: zodResolver(editRoleSchema),
    defaultValues: {
      role: user?.role || 'user',
    },
  })

  const onSubmit = async (data: EditRoleFormData) => {
    if (!user) return

    setIsSubmitting(true)
    try {
      const response = await users.updateRole(user.id, data.role as UserRole)

      if (!response.success) {
        setError('root', { message: response.error })
        toast.error(response.error)
        return
      }

      toast.success('Cập nhật vai trò thành công')
      onOpenChange(false)
      onSuccess()
    } catch {
      setError('root', { message: 'Đã xảy ra lỗi. Vui lòng thử lại.' })
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const roleLabels: Record<UserRole, string> = {
    admin: 'Admin',
    manager: 'Quản lý',
    user: 'Người dùng',
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-[var(--radius-card)] bg-[var(--primary)]/10 flex items-center justify-center">
              <Pencil className="w-4 h-4 text-[var(--primary)]" />
            </div>
            <DialogTitle>Chỉnh sửa vai trò</DialogTitle>
          </div>
          <DialogDescription>
            Cập nhật quyền truy cập của người dùng trong hệ thống.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-[var(--space-inline)]">
          {/* Email (read-only) */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[var(--text-body)]">Email</label>
            <div className="h-10 px-3 py-2 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--background-muted)] text-sm text-[var(--text-caption)] font-mono flex items-center">
              {user?.email}
            </div>
          </div>

          {/* Role */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[var(--text-body)]">Vai trò</label>
            <select
              value={user?.role || 'user'}
              onChange={(e) => setValue('role', e.target.value as UserRole)}
              className="w-full h-10 px-3 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-elevated)] text-sm text-[var(--text-body)] outline-none focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary)]/20"
            >
              <option value="admin">{roleLabels.admin}</option>
              <option value="manager">{roleLabels.manager}</option>
              <option value="user">{roleLabels.user}</option>
            </select>
            {errors.role && (
              <p className="text-xs text-destructive mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Root error */}
          {errors.root && (
            <div className="p-3 rounded-[var(--radius-card)] bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
              {errors.root.message}
            </div>
          )}

          <DialogFooter showCloseButton>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang cập nhật...</> : 'Cập nhật'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}