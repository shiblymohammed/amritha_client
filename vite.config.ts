import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'
import viteImagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    
    // Image optimization
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
      webp: {
        quality: 75,
      },
    }),
    
    // PWA Configuration
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Amritha Heritage',
        short_name: 'Amritha',
        description: 'A luxury heritage hotel in Thiruvananthapuram',
        theme_color: '#DAA520',
        background_color: '#FBF9F6',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    }),
    
    // Bundle analyzer (only in build mode)
    process.env.ANALYZE && visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  
  // Build optimizations
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom'],
          
          // Routing
          'router': ['react-router-dom'],
          
          // UI libraries (if any)
          'ui-libs': ['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          
          // Page chunks for better code splitting
          'pages-home': ['./src/pages/Home.tsx'],
          'pages-about': ['./src/pages/About.tsx'],
          'pages-contact': ['./src/pages/Contact.tsx'],
          'pages-events': ['./src/pages/Events.tsx'],
          'pages-booking': ['./src/pages/Booking.tsx'],
          'pages-dining': ['./src/pages/Dining.tsx'],
          'pages-destinations': ['./src/pages/Destinations.tsx'],
          'pages-accommodation': ['./src/pages/AccommodationPage.tsx'],
          'pages-gallery': ['./src/pages/Gallery.tsx'],
          
          // Component chunks
          'components-hero': ['./src/components/Home/Hero.tsx'],
          'components-accommodation': ['./src/components/Home/AccommodationSection.tsx'],
          'components-dining': ['./src/components/Home/DiningSection.tsx'],
          'components-events': ['./src/components/Home/Events.tsx'],
          'components-destinations': ['./src/components/Home/Destinations.tsx'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // Disable in production for smaller builds
  },
  
  // Development optimizations
  server: {
    fs: {
      strict: true,
    },
  },
  
  // Asset optimization
  assetsInclude: ['**/*.webp', '**/*.avif'],
  
  // Dependency pre-bundling optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
})
