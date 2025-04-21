import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [
        react(),
        visualizer({
            open: true,
            filename: "build/stats.html",
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    base: "/",
    server: {
        port: process.env.PORT || 3000,
        host: true,
    },
    build: {
        outDir: "build",
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
            "~bootstrap": resolve(__dirname, "node_modules/bootstrap"),
            "~@fontsource": resolve(__dirname, "node_modules/@fontsource"),
        },
    },
})
