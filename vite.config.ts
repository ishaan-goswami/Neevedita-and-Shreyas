import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const buildTimestamp = Date.now();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/app-${buildTimestamp}-[name].js`,
        chunkFileNames: `assets/chunk-${buildTimestamp}-[name].js`,
        assetFileNames: `assets/asset-${buildTimestamp}-[name].[ext]`,
      },
    },
  },
});
