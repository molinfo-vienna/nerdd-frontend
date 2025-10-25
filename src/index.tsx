import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.scss"

import "@fontsource/open-sans/latin-400.css?display=swap"
import "@fontsource/overpass/latin-500.css?display=swap"

import Root from "./app/Root"
import Providers from "./providers"

const container = document.getElementById("root")

if (!container) {
    throw new Error("Root container not found")
}

const root = createRoot(container)
root.render(
    <StrictMode>
        <Providers>
            <Root />
        </Providers>
    </StrictMode>,
)

// reportWebVitals(console.log)
