import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "bootstrap/dist/js/bootstrap.bundle"
import "./index.scss"

import reportWebVitals from "./reportWebVitals"

import { Outlet } from "react-router-dom"
import Providers from "./providers"

const container = document.getElementById("root")

if (!container) {
    throw new Error("Root container not found")
}

const root = createRoot(container)
root.render(
    <StrictMode>
        <Providers>
            <Outlet />
        </Providers>
    </StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
