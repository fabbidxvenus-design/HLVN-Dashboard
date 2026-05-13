import { cn } from '../../lib/utils'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'default' | 'lg'
}

export function Avatar({
  className,
  src,
  alt,
  fallback,
  size = 'default',
  children,
  ...props
}: AvatarProps & { children?: React.ReactNode }) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    default: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  }

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-primary-container)]',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : children || (
        <span className="font-medium text-[var(--color-on-primary-container)]">
          {fallback?.[0]?.toUpperCase() || '?'}
        </span>
      )}
    </div>
  )
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)]',
        className
      )}
      {...props}
    />
  )
}