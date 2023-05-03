import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdPlugin from 'vite-plugin-markdown'
import path from 'path'
export default defineConfig({
  plugins: [react(), (mdPlugin as any).default({ mode: 'html' })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000
    // proxy: {
    //   '/api': {
    //     target: 'http://file.re1ife.top/api',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  }
})
