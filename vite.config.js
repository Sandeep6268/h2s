import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name]-[hash].js`,  // Adds hash to filenames
        assetFileNames: `[name]-[hash].[ext]`
      }
    }
  }
})
