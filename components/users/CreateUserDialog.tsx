'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Loader2, UserPlus } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { UserRole } from '@/types/user'
import { users } from '@/lib/api/endpoints'

const createUserSchema = z.object({
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  role: z.enum(['admin', 'manager', 'user'], { required_error: 'Vui lòng chọn vai trò' }),
})

type CreateUserFormData = z.infer<typeof createUserSchema>

interface CreateUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function CreateUserDialog({ open, onOpenChange, onSuccess }: CreateUserDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  })

  const onSubmit = async (data: CreateUserFormData) => {
    setIsSubmitting(true)
    try {
      const response = await users.create({ email: data.email, role: data.role })

      if (!response.success) {
        setError('root', { message: response.error })
        toast.error(response.error)
        return
      }

      toast.success('Tạo người dùng thành công')
      reset()
      onOpenChange(false)
      onSuccess()
    } catch {
      setError('root', { message: 'Đã xảy ra lỗi. Vui lòng thử lại.' })
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
            <div className="w-8 h-8 rounded-[var(--radius-card)] bg-[var(--primary)]/10 flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-[var(--primary)]" />
            </div>
            <DialogTitle>Tạo người dùng mới</DialogTitle>
          </div>
          <DialogDescription>
            Thêm tài khoản người dùng mới vào hệ thống.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-[var(--space-inline)]">
          {/* Root error */}
          {errors.root && (
            <div className="p-3 rounded-[var(--radius-card)] bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
              {errors.root.message}
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[var(--text-body)]">Email</label>
            <Input
              type="email"
              placeholder="email@hlvn.vn"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[var(--text-body)]">Mật khẩu</label>
            <Input
              type="password"
              placeholder="Nhập mật khẩu"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[var(--text-body)]">Vai trò</label>
            <select
              {...register('role')}
              className="w-full h-10 px-3 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-elevated)] text-sm text-[var(--text-body)] outline-none focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary)]/20"
            >
              <option value="">Chọn vai trò</option>
              <option value="admin">Admin</option>
              <option value="manager">Quản lý</option>
              <option value="user">Người dùng</option>
            </select>
            {errors.role && (
              <p className="text-xs text-destructive mt-1">{errors.role.message}</p>
            )}
          </div>

          <DialogFooter showCloseButton>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang tạo...</> : 'Tạo người dùng'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}