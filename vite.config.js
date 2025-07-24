import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Proxy local con Vite ( para seguir trabajando sin trabas)
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-tcg': {
        target: 'https://api.pokemontcg.io',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api-tcg/, '')
      }
    }
  }
})
