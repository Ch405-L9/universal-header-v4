import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'analyze' && visualizer({ open: true, gzipSize: true })
  ].filter(Boolean),
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: {
    target: 'es2015',
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react')) return 'react-vendor';
          if (id.includes('@radix-ui')) return 'radix-vendor';
          if (id.includes('lucide-react')) return 'icons-vendor';
          if (id.includes('/src/components/')) return 'components';
        }
      }
    },
    chunkSizeWarningLimit: 500
  },
  server: { port: 3000, host: true },
  preview: { port: 4173, host: true }
}));
