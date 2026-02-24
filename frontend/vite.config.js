import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/",   // 👈 VERY IMPORTANT
  server: {
    port: 3000,
    strictPort: true,
  },
})