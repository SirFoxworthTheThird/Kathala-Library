import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Node, not jsdom: nothing here renders. These tests read the shipped
    // worlds as files and check what they say.
    environment: 'node',
    // Source-edition fixtures verify hundreds of artwork hashes per worker.
    // Serialize that disk/memory work while retaining the normal test timeout.
    maxWorkers: 1,
    include: ['tests/**/*.test.ts'],
  },
})
