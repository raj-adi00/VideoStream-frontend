import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // '/api': 'https://itube-iser.onrender.com'
      // '/api':'http://localhost:8000'
      "/api": "https://videostream-production-3c23.up.railway.app",
    },
  },
  plugins: [react()],
});
