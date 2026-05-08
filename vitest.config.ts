import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    include: [
      'coding-packs/plans/full-auto-pipeline-init/specs/**/*.test.ts',
      'coding-packs/plans/update-design/specs/**/*.test.ts',
      'coding-packs/plans/redesign/specs/**/*.test.ts',
    ],
    coverage: {
      provider: 'v8',
      include: ['app/**', 'components/**', 'lib/**', 'stores/**', 'hooks/**', 'types/**'],
      exclude: ['node_modules/**', 'app/api/**'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 60,
        statements: 70,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})