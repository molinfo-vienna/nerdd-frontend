import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./store"

import "bootstrap/dist/js/bootstrap.bundle"
import "./index.scss"

import reportWebVitals from "./reportWebVitals"

import App from "./App"

const root = createRoot(document.getElementById("root")!)
// TODO: use provider classes
root.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
