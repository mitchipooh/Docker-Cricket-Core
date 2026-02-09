
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : './', // Use absolute root locally for dev, relative for build (Portable)
  build: {
    outDir: 'dist',
  }
}))
