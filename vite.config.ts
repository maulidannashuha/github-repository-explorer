import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js', 
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: '/github-repository-explorer/'
} as UserConfig)
