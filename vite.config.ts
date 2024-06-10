import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const config = defineConfig({
  plugins: [
    react(),
  ],
  assetsInclude: ['**/*.svg', '**/*.htm', '**/*.cshtml'],
  build: {
    minify: 'esbuild',
    sourcemap: true,
    emptyOutDir: true,
  },
});

export default config;
