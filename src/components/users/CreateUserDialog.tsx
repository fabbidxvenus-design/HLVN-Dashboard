import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface CreateUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { email: string; password: string; role: string }) => void
  loading?: boolean
}

export function CreateUserDialog({ open, onOpenChange, onSubmit, loading }: CreateUserDialogProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Vui lòng điền đầy đủ thông tin')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email không hợp lệ')
      return
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }
    onSubmit({ email, password, role: 'user' })
  }

  const handleClose = () => {
    setEmail('')
    setPassword('')
    setError('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Thêm người dùng mới</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              error={error && !email ? 'Vui lòng nhập email' : undefined}
            />
            <Input
              label="Mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ít nhất 6 ký tự"
              error={error || undefined}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outlined" onClick={handleClose} disabled={loading}>
              Hủy
            </Button>
            <Button type="submit" loading={loading}>
              Tạo mới
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}