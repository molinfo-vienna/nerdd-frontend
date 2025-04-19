import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [react()],
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
