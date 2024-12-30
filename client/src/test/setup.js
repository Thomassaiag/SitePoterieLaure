import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Add any global mocks or setup here
global.fetch = vi.fn()


const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
}
global.localStorage = localStorageMock