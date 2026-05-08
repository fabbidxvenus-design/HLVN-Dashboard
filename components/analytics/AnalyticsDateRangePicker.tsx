'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AnalyticsDateRangePickerProps {
  value: string
  onChange: (range: string) => void
}

const rangeOptions = [
  { label: '7 ngày qua', value: '7d' },
  { label: '30 ngày qua', value: '30d' },
  { label: '90 ngày qua', value: '90d' },
]

export function AnalyticsDateRangePicker({ value, onChange }: AnalyticsDateRangePickerProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[var(--text-muted)]">Khoảng thời gian:</span>
      <Select value={value} onValueChange={(val) => onChange(val || '7d')}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Chọn khoảng thời gian" />
        </SelectTrigger>
        <SelectContent>
          {rangeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}