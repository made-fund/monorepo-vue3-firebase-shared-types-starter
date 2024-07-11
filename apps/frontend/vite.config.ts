import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@shared/types': path.resolve(__dirname, '../backend/functions/src/types.ts'),

      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      // Ensure the shared types file is included in the build
      external: ['../backend/functions/src/types.ts'],
      // external: ['@shared/types'], ❓ above line is a suggestion by Danny. This is what it was originally
    },
  },
})
