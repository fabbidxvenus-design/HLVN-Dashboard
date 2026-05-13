import { Component, type ReactNode } from 'react'
import { Button } from './button'
import { AlertCircle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex h-screen w-full items-center justify-center bg-[var(--color-surface)]">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-error-container)]">
              <AlertCircle className="h-8 w-8 text-[var(--color-error)]" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-[var(--color-on-surface)]">
              Có lỗi xảy ra
            </h2>
            <p className="mb-6 text-sm text-[var(--color-on-surface-variant)]">
              {this.state.error?.message || 'Đã có lỗi không mong muốn xảy ra.'}
            </p>
            <Button onClick={this.handleReset}>Thử lại</Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}