import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/todo': {
        target: 'http://localhost:4001', // Your backend server URL
        changeOrigin: true,
        secure: false
      },
      '/user': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
