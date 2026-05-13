import { cn } from '../../lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium font-label',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-surface-container)] text-on-surface-variant',
        success:
          'bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)]',
        warning:
          'bg-amber-100 text-amber-800',
        error:
          'bg-[var(--color-error-container)] text-[var(--color-error)]',
        outline:
          'border border-[var(--color-outline)] text-on-surface-variant',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}