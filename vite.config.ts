import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true
  },
  build: {
    minify: 'terser',
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          if (id.includes('node_modules/react-router-dom')) {
            return 'router';
          }
          if (id.includes('@radix-ui') || id.includes('lucide-react')) {
            return 'ui-libs';
          }
          if (id.includes('ContactForm') || id.includes('ClientIntakeForm')) {
            return 'forms';
          }
        }
      }
    },
    target: 'es2020',
    chunkSizeWarningLimit: 500,
    reportCompressedSize: true,
    sourcemap: false
  }
})
