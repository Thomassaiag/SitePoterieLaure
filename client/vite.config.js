import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  
  server:{
    port:14000
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    // Add these lines to help with module mocking
    deps: {
      inline: ['./src/components']
    }
  }
})
