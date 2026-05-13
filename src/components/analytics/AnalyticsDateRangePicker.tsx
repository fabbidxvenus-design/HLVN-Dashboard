import { Button } from '../ui/button'
import { Calendar } from 'lucide-react'

interface AnalyticsDateRangePickerProps {
  value: { days: number; from: string; to: string }
  onChange: (value: { days: number; from: string; to: string }) => void
}

export function AnalyticsDateRangePicker({ value, onChange }: AnalyticsDateRangePickerProps) {
  const presets = [
    { label: '7 ngày', days: 7 },
    { label: '30 ngày', days: 30 },
    { label: '90 ngày', days: 90 },
  ]

  const setPreset = (days: number) => {
    const to = new Date()
    const from = new Date()
    from.setDate(from.getDate() - days)
    onChange({
      days,
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0],
    })
  }

  const setCustomRange = (field: 'from' | 'to', date: string) => {
    onChange({ ...value, days: 0, [field]: date })
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container)] p-1">
        {presets.map((preset) => (
          <Button
            key={preset.days}
            variant={value.days === preset.days ? 'filled' : 'text'}
            size="sm"
            onClick={() => setPreset(preset.days)}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-[var(--color-on-surface-variant)]" />
        <input
          type="date"
          value={value.from}
          onChange={(e) => setCustomRange('from', e.target.value)}
          className="h-9 rounded-lg border border-[var(--color-outline-variant)] bg-transparent px-3 text-sm"
        />
        <span className="text-[var(--color-on-surface-variant)]">—</span>
        <input
          type="date"
          value={value.to}
          onChange={(e) => setCustomRange('to', e.target.value)}
          className="h-9 rounded-lg border border-[var(--color-outline-variant)] bg-transparent px-3 text-sm"
        />
      </div>
    </div>
  )
}