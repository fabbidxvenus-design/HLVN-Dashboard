import { cn } from '../../lib/utils'

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

export function Table({ className, ...props }: TableProps) {
  return (
    <table
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  )
}

interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      className={cn('bg-[var(--color-surface-container-low)]', className)}
      {...props}
    />
  )
}

interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        'border-b border-[var(--color-outline-variant)] transition-colors hover:bg-[var(--color-surface-container-low)]',
        className
      )}
      {...props}
    />
  )
}

interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {}

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      className={cn(
        'h-12 px-4 text-left align-middle font-label text-sm font-medium text-on-surface-variant',
        className
      )}
      {...props}
    />
  )
}

interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={cn('p-4 align-middle', className)}
      {...props}
    />
  )
}