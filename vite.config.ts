import mdx from "@mdx-js/rollup"
import react from "@vitejs/plugin-react"
import rehypeSlug from "rehype-slug"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig, type PluginOption } from "vite"
import { sri } from "vite-plugin-sri3"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig(({ mode }) => ({
    plugins: [
        mdx({ rehypePlugins: [rehypeSlug] }) as PluginOption,
        react(),
        visualizer({
            open: true,
            filename: "build/stats.html",
            gzipSize: true,
            brotliSize: true,
        }) as PluginOption,
        tsconfigPaths(),
        sri({ ignoreMissingAsset: false }),
    ],
    base: "/",
    server: {
        port: Number(process.env.PORT) || 3000,
        host: true,
        // Proxy API requests to the backend server in development mode
        // Note: The proxy will never be reached when the mock server is enabled.
        proxy:
            mode === "development"
                ? {
                      "/api/": {
                          target: "http://localhost:8000",
                          changeOrigin: true,
                          secure: false,
                          rewrite: (path) => path,
                      },
                  }
                : undefined,
    },
    build: {
        outDir: "build",
    },
}))
