import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig, type PluginOption } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    plugins: [
        react(),
        visualizer({
            open: true,
            filename: "build/stats.html",
            gzipSize: true,
            brotliSize: true,
        }) as PluginOption,
        tsconfigPaths(),
    ],
    base: "/",
    server: {
        port: Number(process.env.PORT) || 3000,
        host: true,
    },
    build: {
        outDir: "build",
    },
})
