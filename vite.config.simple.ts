import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Simplified Vite config for deployment
export default defineConfig({
  plugins: [react()],
  
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
  
  server: {
    fs: {
      strict: true,
    },
  },
  
  assetsInclude: ['**/*.webp', '**/*.avif'],
  
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
})
