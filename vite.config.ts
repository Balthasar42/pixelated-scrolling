import path from "node:path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Unfonts from "unplugin-fonts/vite"

export default defineConfig({
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    vue(),
    Unfonts({
      google: {
        families: ["Outfit", "Neuton"],
      },
    }),
  ],
})
