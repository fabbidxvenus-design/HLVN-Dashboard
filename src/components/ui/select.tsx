import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

export function Select({ value, onValueChange, children }: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      {children}
    </SelectPrimitive.Root>
  )
}

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
}

export function SelectTrigger({ children, className }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'flex h-12 w-full items-center justify-between rounded-lg border-0 bg-[var(--color-surface-container)] px-4 py-3 text-sm ring-1 ring-[var(--color-outline-variant)] focus:ring-2 focus:ring-[var(--color-primary)]',
        className
      )}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

interface SelectContentProps {
  children: React.ReactNode
}

export function SelectContent({ children }: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-lg bg-[var(--color-surface-container-lowest)] shadow-lg">
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
}

export function SelectItem({ value, children }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      value={value}
      className="relative flex cursor-pointer items-center rounded-md py-2 pl-8 pr-2 text-sm outline-none hover:bg-[var(--color-surface-container-high)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      <SelectPrimitive.ItemIndicator className="absolute left-2">
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export const SelectValue = SelectPrimitive.Value