import { defineConfig } from 'vitest/config'

export default defineConfig({ test: { include: ['tests/vue/**/*.spec.ts'], environment: 'node' } })
