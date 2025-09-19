import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',       // บอกว่า index.html อยู่ที่ root
  build: {
    outDir: 'dist'
  }
})
