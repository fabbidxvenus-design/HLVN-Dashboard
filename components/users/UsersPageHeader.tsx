'use client'

import { Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface UsersPageHeaderProps {
  onCreateClick: () => void
  className?: string
}

export function UsersPageHeader({ onCreateClick, className }: UsersPageHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-4 ${className || ''}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-[var(--radius-card)] bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
          <Users className="w-5 h-5 text-[var(--primary)]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-heading)] tracking-tight">
            Quản lý người dùng
          </h1>
          <p className="text-sm text-[var(--text-caption)] mt-0.5">
            Xem, tạo, chỉnh sửa và xóa người dùng trong hệ thống
          </p>
        </div>
      </div>
      <Button onClick={onCreateClick} size="sm" className="sm:shrink-0">
        <Users className="w-4 h-4 mr-1" />
        Thêm người dùng
      </Button>
    </div>
  )
}