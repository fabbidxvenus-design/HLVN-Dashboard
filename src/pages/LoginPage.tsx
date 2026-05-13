import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ShieldCheck, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../hooks/use-auth'
import { Button } from '../components/ui/button'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
    if (localStorage.getItem('accessToken')) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[var(--color-primary-container)] opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[var(--color-secondary-container)] opacity-20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm mx-auto px-4">
        {/* Card */}
        <div className="bg-[var(--color-surface-container-lowest)] rounded-xl shadow-lg border border-[var(--color-outline-variant)] p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--color-primary)] mb-4">
              <ShieldCheck className="w-8 h-8 text-[var(--color-on-primary)]" />
            </div>
            <h1 className="font-headline font-bold text-2xl text-on-surface">
              HLVN Dashboard
            </h1>
            <p className="mt-1 text-on-surface-variant font-label text-sm">
              Sign in to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email field */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-on-surface-variant font-label"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={isLoading}
                className="flex h-12 w-full rounded-lg border-0 bg-[var(--color-surface-container)] px-4 py-3 text-sm text-on-surface ring-1 ring-[var(--color-outline-variant)] transition-colors placeholder:text-on-surface-variant focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none disabled:opacity-50"
              />
            </div>

            {/* Password field */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-on-surface-variant font-label"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                  className="flex h-12 w-full rounded-lg border-0 bg-[var(--color-surface-container)] px-4 py-3 pr-12 text-sm text-on-surface ring-1 ring-[var(--color-outline-variant)] transition-colors placeholder:text-on-surface-variant focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-on-surface-variant hover:text-on-surface transition-colors disabled:opacity-50"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-[var(--color-error-container)] px-4 py-3">
                <AlertCircle className="w-4 h-4 shrink-0 text-[var(--color-error)]" />
                <p className="text-sm text-[var(--color-error)] font-label">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              variant="filled"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-on-surface-variant font-label">
          HLVN Dashboard v0.1.0
        </p>
      </div>
    </div>
  )
}