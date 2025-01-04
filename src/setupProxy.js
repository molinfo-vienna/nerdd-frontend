const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:8000",
            // target: "http://nerdd-backend:8000",
            logLevel: "debug",
            changeOrigin: true,
        }),
    )

    // important: for websocket it is necessary to use the pathFilter option instead
    // of app.use('/websocket', createProxyMiddleware(...))
    app.use(
        createProxyMiddleware({
            target: "ws://localhost:8000/",
            // target: "ws://nerdd-backend:8000/",
            changeOrigin: true,
            logLevel: "debug",
            ws: true,
            pathFilter: "/websocket",
        }),
    )
}
