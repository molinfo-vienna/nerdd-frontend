import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.scss"

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
