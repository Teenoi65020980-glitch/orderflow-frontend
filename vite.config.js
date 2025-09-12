import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // ใช้ root ปัจจุบัน
  publicDir: 'public', // โฟลเดอร์สำหรับ static files
  build: {
    outDir: 'dist', // โฟลเดอร์สำหรับไฟล์ build
  },
})