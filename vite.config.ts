import mdx from "@mdx-js/rollup"
import react from "@vitejs/plugin-react"
import path from "node:path"
import rehypeSlug from "rehype-slug"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig, type PluginOption } from "vite"
import { sri } from "vite-plugin-sri3"
import tsconfigPaths from "vite-tsconfig-paths"

function isInGraph(
    id: string,
    component: string,
    getModuleInfo: any,
    includeDynamicImports: boolean = false,
    seen = new Set<string>(),
) {
    if (id === path.resolve(__dirname, `src/${component}`)) return true
    if (seen.has(id)) return false
    seen.add(id)

    const info = getModuleInfo(id)
    if (!info) return false
    if (info.isEntry) return true

    const dynamicImports = includeDynamicImports ? info.dynamicImports : []

    const importers = [...info.importers, ...dynamicImports] as string[]

    return importers.some((imp: string) =>
        isInGraph(imp, component, getModuleInfo, includeDynamicImports, seen),
    )
}

export default defineConfig(({ mode }) => ({
    plugins: [
        mdx({
            rehypePlugins: [rehypeSlug],
            include: /\.mdx$/, // Only process .mdx files, not .md files
        }) as PluginOption,
        react(),
        visualizer({
            open: true,
            template: "treemap",
            filename: "build/treemap.html",
            gzipSize: true,
            brotliSize: true,
        }) as PluginOption,
        visualizer({
            template: "raw-data",
            filename: "build/bundle-stats.json",
            gzipSize: true,
            brotliSize: true,
        }) as PluginOption,
        visualizer({
            // open: true,
            template: "network",
            filename: "build/network.html",
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
        // the main css file dominates all other files in size
        // -> splitting css into separate files provides no benefit
        cssCodeSplit: false,
        // we are ok with chunks up to 1mb (uncompressed)
        chunkSizeWarningLimit: 1000,

        rollupOptions: {
            output: {
                manualChunks(id, { getModuleInfo }) {
                    // Major goal of manual chunking:
                    // * have small loading times for the landing page and the CreateJobPage
                    // * loading times of all other pages are irrelevant
                    //
                    // After a lot of fiddling this is what I came up with:
                    // * label everything reachable from index.tsx as "landing-page" so it ends up
                    //   in one chunk
                    // * give CreateJobPage its own label
                    //
                    // Any other labeling strategy that I tried resulted in other partitions that
                    // were suboptimal. Use "npm run analyze" to see the created chunks.

                    if (isInGraph(id, "index.tsx", getModuleInfo)) {
                        return "LandingPage"
                    } else if (id.includes("CreateJobPage")) {
                        return "CreateJobPage"
                    }
                },
            },
        },
    },
}))
