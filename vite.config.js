import { defineConfig } from 'vite';

export default defineConfig({
  // Relative assets work both locally and under https://istin.github.io/kidstalk/.
  base: './',
  build: {
    // Three.js is a shared vendor chunk; each story scene itself is lazy-loaded.
    chunkSizeWarningLimit: 550,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/')) return 'three';
        },
      },
    },
  },
});
