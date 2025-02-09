import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true })
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://api.jsjst.top',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.removeHeader('Accept')
            proxyReq.removeHeader('Content-Type')
            
            proxyReq.setHeader('User-Agent', 'Mozilla/5.0')
            proxyReq.setHeader('Accept', '*/*')
          })
          proxy.on('error', (err, req, res) => {
            console.error('proxy error', err)
          })
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('proxy response:', proxyRes.statusCode, req.url)
          })
        }
      }
    }
  }
})
