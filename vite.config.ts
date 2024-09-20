import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',  // Ensure this is not set to 'src'
  },
  plugins: [vue()],
})
