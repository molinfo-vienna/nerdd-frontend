import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        react(),
        visualizer({
            open: true,
            filename: "build/stats.html",
            gzipSize: true,
            brotliSize: true,
        }),
        tsconfigPaths(),
    ],
    base: "/",
    server: {
        port: process.env.PORT || 3000,
        host: true,
    },
    build: {
        outDir: "build",
    },
})
