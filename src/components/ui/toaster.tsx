import { Toaster as SonnerToaster } from 'sonner'

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'var(--color-surface-container-high)',
          color: 'var(--color-on-surface)',
          border: '1px solid var(--color-outline-variant)',
        },
      }}
    />
  )
}