import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['67642-192.png', '67642-512.png'], 
      manifest: {
        name: 'VayuCast Delhi NCR',
        short_name: 'VayuCast',
        description: 'Real-time Air Quality & Weather Monitoring',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          {
            src: '/67642-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/67642-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})