
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : '/Cricketcore/', // Use root for dev, GitHub Pages subfolder for production
  build: {
    outDir: 'dist',
  }
}))
