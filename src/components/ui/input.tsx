import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-on-surface-variant font-label"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'flex h-12 w-full rounded-lg border-0 bg-[var(--color-surface-container)] px-4 py-3 text-sm text-on-surface ring-1 transition-colors',
            'placeholder:text-on-surface-variant',
            'focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none',
            error
              ? 'ring-[var(--color-error)]'
              : 'ring-[var(--color-outline-variant)]',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-[var(--color-error)] font-label">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'