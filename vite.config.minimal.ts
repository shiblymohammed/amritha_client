import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Minimal Vite config for deployment
export default defineConfig({
  plugins: [react()],
  
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
  },
  
  server: {
    port: 3000,
    host: true,
  },
})
