import { defineConfig } from "vite";
import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue(),
    vueDevTools(),
    createHtmlPlugin({}),
  ],
   devtools: {
    apply: 'serve',
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
