// src/test/setup.js
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Add any global mocks or setup here
global.fetch = vi.fn()