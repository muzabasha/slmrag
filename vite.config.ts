import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Enable cache busting with content hashes
    rollupOptions: {
      output: {
        // Use content hash for all assets
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Disable source maps for production
    sourcemap: false,
    // Disable minification to avoid dependency issues
    minify: false,
    // Clear output directory before build
    emptyOutDir: true
  },
  server: {
    // Disable caching in development
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  }
})
