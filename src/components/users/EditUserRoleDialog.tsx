import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../ui/select'
import { isAdminRole, type UserProfile, type UserRole } from '../../types'

interface EditUserRoleDialogProps {
  user: UserProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (role: UserRole) => void
  loading?: boolean
}

export function EditUserRoleDialog({
  user,
  open,
  onOpenChange,
  onSubmit,
  loading,
}: EditUserRoleDialogProps) {
  const [role, setRole] = useState<UserRole>(user?.role || 'user')
  const isPeerAdmin = isAdminRole(user?.role)

  useEffect(() => {
    if (user) setRole(user.role)
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isPeerAdmin) return
    onSubmit(role)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && user) {
      setRole(user.role)
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa vai trò</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="mb-2 text-sm text-[var(--color-on-surface-variant)]">Email</p>
            <p className="font-medium text-[var(--color-on-surface)]">{user?.email}</p>

            {isPeerAdmin && (
              <div className="mt-3 rounded-lg bg-[var(--color-surface-container)] p-3 text-sm text-[var(--color-on-surface-variant)]">
                Không thể chỉnh sửa vai trò của quản trị viên khác
              </div>
            )}

            <div className="mt-4">
              <p className="mb-2 text-sm text-[var(--color-on-surface-variant)]">Vai trò</p>
              <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                <SelectTrigger className={isPeerAdmin ? 'pointer-events-none opacity-50' : ''}>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                  <SelectItem value="manager">Quản lý</SelectItem>
                  <SelectItem value="user">Người dùng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outlined" onClick={() => onOpenChange(false)} disabled={loading}>
              Hủy
            </Button>
            <Button type="submit" loading={loading} disabled={isPeerAdmin}>
              Lưu
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}