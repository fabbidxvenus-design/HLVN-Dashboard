import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        filled:
          'bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary)]/90',
        tonal:
          'bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] hover:opacity-90',
        outlined:
          'border border-[var(--color-outline)] bg-transparent text-on-surface hover:bg-[var(--color-surface-container-high)]',
        text:
          'bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-surface-container-high)]',
        destructive:
          'bg-[var(--color-error)] text-white hover:opacity-90',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'