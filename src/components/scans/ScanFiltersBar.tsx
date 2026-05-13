import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../ui/select'
import type { ScanFilters } from '../../types'

interface ScanFiltersBarProps {
  filters: ScanFilters
  onFiltersChange: (filters: ScanFilters) => void
}

export function ScanFiltersBar({ filters, onFiltersChange }: ScanFiltersBarProps) {
  const [localSearch, setLocalSearch] = useState(filters.search)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        onFiltersChange({ ...filters, search: localSearch, page: 1 })
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [localSearch])

  const handleStatusChange = (status: string) => {
    onFiltersChange({ ...filters, status: status === 'all' ? '' : status, page: 1 })
  }

  const handleDateChange = (field: 'dateFrom' | 'dateTo', value: string) => {
    onFiltersChange({ ...filters, [field]: value, page: 1 })
  }

  const clearFilters = () => {
    setLocalSearch('')
    onFiltersChange({
      search: '',
      status: '',
      dateFrom: '',
      dateTo: '',
      page: 1,
      limit: filters.limit,
    })
  }

  const hasActiveFilters = filters.search || filters.status || filters.dateFrom || filters.dateTo

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-on-surface-variant)]" />
        <Input
          placeholder="Tìm kiếm theo nội dung OCR..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={filters.status || 'all'} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="success">Thành công</SelectItem>
          <SelectItem value="pending">Đang xử lý</SelectItem>
          <SelectItem value="failed">Thất bại</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="date"
        value={filters.dateFrom}
        onChange={(e) => handleDateChange('dateFrom', e.target.value)}
        className="w-[160px]"
      />
      <span className="text-[var(--color-on-surface-variant)]">—</span>
      <Input
        type="date"
        value={filters.dateTo}
        onChange={(e) => handleDateChange('dateTo', e.target.value)}
        className="w-[160px]"
      />

      {hasActiveFilters && (
        <Button variant="text" size="sm" onClick={clearFilters}>
          <X className="h-4 w-4" />
          Xóa lọc
        </Button>
      )}
    </div>
  )
}