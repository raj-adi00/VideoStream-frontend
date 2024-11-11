export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://itube-iser.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // removes '/api' prefix
      }
    },
  },
  plugins: [react()],
})