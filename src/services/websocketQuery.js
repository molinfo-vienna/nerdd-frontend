import ReconnectingWebSocket from "reconnecting-websocket"

export default function websocketQuery({
    builder,
    query,
    queryWs,
    transformResponse,
    transformResponseWs,
    process,
}) {
    return builder.query({
        query,
        transformResponse,
        onCacheEntryAdded: async (
            args,
            { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
        ) => {
            // wait for the initial query to resolve before proceeding
            await cacheDataLoaded

            let ws
            try {
                // build the websocket URL
                const queryPath = queryWs(args)
                const hostname = window.location.hostname
                const port = window.location.port
                const slash = queryPath.startsWith("/") ? "" : "/"
                const url = `ws://${hostname}:${port}${slash}${queryPath}`

                console.log("opening websocket connection", url)

                // create a websocket connection when the cache subscription starts
                // ReconnectingWebSocket is a drop-in replacement for the native WebSocket API
                // Main benefit is that it automatically reconnects when the connection is lost.
                ws = new ReconnectingWebSocket(url, "ws")

                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data)
                    const transformedData = transformResponseWs(data)
                    updateCachedData((draft) => {
                        // TODO: messages might get lost here
                        if (draft != null) {
                            return process(draft, transformedData, false)
                        }
                    })
                }

                ws.onclose = (e) => {
                    if (e.wasClean) {
                        // signal that the websocket connection was closed
                        updateCachedData((draft) => {
                            // TODO: messages might get lost here
                            if (draft != null) {
                                return process(draft, undefined, true)
                            }
                        })

                        // close the websocket connection
                        // (ReconnectingWebSocket won't reconnect in this case)
                        ws.close()
                    } else {
                        console.error(
                            "WebSocket connection closed unexpectedly",
                            e,
                        )
                    }
                }
            } catch (e) {
                console.error(e)
                // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                // in which case `cacheDataLoaded` will throw
            } finally {
                // The promise cacheEntryRemoved will resolve when the cache
                // subscription is no longer active. For example, this happens when
                // the component using this query is unmounted.
                await cacheEntryRemoved

                // perform cleanup steps once the `cacheEntryRemoved` promise resolves
                if (ws) {
                    ws.close()
                }
            }
        },
    })
}
