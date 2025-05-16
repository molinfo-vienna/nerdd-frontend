import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTests.js",
        include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        exclude: ["**/node_modules/**", "**/build/**"],
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
})
