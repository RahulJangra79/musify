import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    allowedHosts: ['8c23-2401-4900-88c4-e4d3-7c8b-df87-99d5-55d3.ngrok-free.app'],
  },
})
