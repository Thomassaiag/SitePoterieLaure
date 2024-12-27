import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // Output directory for built files
  },
  
  server:{
    port:14000
  },
  plugins: [react()]
})
