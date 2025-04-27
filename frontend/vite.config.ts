import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: mode === 'production' ? 5173 : 8080,
  },
  preview: {
    port: 5173,
    host: true,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(
      mode === 'production' 
        ? 'https://coffee-kiosk-api.onrender.com'
        : 'http://localhost:3000'
    ),
  },
}));
