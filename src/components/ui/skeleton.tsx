import { cn } from '../../lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-[var(--color-surface-container)]',
        variant === 'circular' && 'rounded-full',
        variant === 'text' && 'rounded h-4',
        className
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  )
}