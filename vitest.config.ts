import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Node, not jsdom: nothing here renders. These tests read the shipped
    // worlds as files and check what they say.
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
})
