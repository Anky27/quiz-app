import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Keep this for relative asset paths
  build: {
    // Specify the output directory for the build
    outDir: 'dist',
    // Define the entry point(s) for the build
    rollupOptions: {
      input: {
        main: './index.html' // Explicitly tell Rollup to use index.html as the entry
      }
    }
  }
});
