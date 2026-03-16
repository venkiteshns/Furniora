import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/user": "https://the-royal-furnitures.onrender.com"
    }
  },
  plugins: [react()],
})
