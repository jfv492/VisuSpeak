import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   port: parseInt(process.env.PORT, 10) || 3001,
  // },
  build: {
    rollupOptions: {
      input: {
        main: resolve('./index.html'),
      },
    },
  },
  plugins: [react()],
})
