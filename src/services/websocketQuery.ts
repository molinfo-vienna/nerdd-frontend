import {
    type BaseQueryArg,
    type BaseQueryFn,
    type BaseQueryResult,
    type EndpointBuilder,
} from "@reduxjs/toolkit/query"
import ReconnectingWebSocket from "reconnecting-websocket"

type WebsocketQueryParameters<
    ResultType,
    QueryArg,
    BaseQuery extends BaseQueryFn,
    RawResultType extends BaseQueryResult<BaseQuery>,
    TagTypes extends string,
    ReducerPath extends string,
> = {
    builder: EndpointBuilder<BaseQuery, TagTypes, ReducerPath>
    queryWs: (arg: QueryArg) => BaseQueryArg<BaseQuery>
    transformResponseWs: (
        baseQueryReturnValue: RawResultType,
    ) => ResultType | Promise<ResultType>
    process: (draft: unknown, data: unknown, complete: boolean) => void
} & Parameters<EndpointBuilder<BaseQuery, TagTypes, ReducerPath>["query"]>[0]

export default function websocketQuery<
    ResultType,
    QueryArg,
    BaseQuery extends BaseQueryFn,
    TagTypes extends string,
    ReducerPath extends string = string,
    RawResultType extends
        BaseQueryResult<BaseQuery> = BaseQueryResult<BaseQuery>,
>({
    builder,
    queryWs,
    transformResponseWs,
    process,
    ...definition
}: WebsocketQueryParameters<
    ResultType,
    QueryArg,
    BaseQuery,
    RawResultType,
    TagTypes,
    ReducerPath
>) {
    return builder.query({
        ...(definition as unknown as Parameters<
            EndpointBuilder<BaseQuery, TagTypes, ReducerPath>["query"]
        >[0]),
        onCacheEntryAdded: async (
            args: QueryArg,
            { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
        ) => {
            // wait for the initial query to resolve before proceeding
            await cacheDataLoaded

            let ws: ReconnectingWebSocket | undefined
            try {
                // build the websocket URL
                const queryPath = queryWs(args)
                const hostname = window.location.hostname
                const port = window.location.port
                const basePath = queryPath.startsWith("/") ? "" : "/"
                const protocol =
                    window.location.protocol === "https:" ? "wss" : "ws"
                const url = `${protocol}://${hostname}:${port}${basePath}${queryPath}`

                // create a websocket connection when the cache subscription starts
                // ReconnectingWebSocket is a drop-in replacement for the native WebSocket API
                // Main benefit is that it automatically reconnects when the connection is lost.
                ws = new ReconnectingWebSocket(url, protocol, {
                    maxReconnectionDelay: 30000,
                })

                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data)
                    const transformedData = transformResponseWs(data)
                    updateCachedData((draft) => {
                        // TODO: messages might get lost here
                        if (draft != null) {
                            return process(draft, transformedData, false)
                        } else {
                            console.error("draft is null")
                        }
                    })
                }

                ws.onclose = (e) => {
                    if (e.wasClean && e.reason !== "timeout") {
                        // signal that the websocket connection was closed
                        updateCachedData((draft) => {
                            // TODO: messages might get lost here
                            if (draft != null) {
                                return process(draft, undefined, true)
                            }
                        })

                        // close the websocket connection
                        // (ReconnectingWebSocket won't reconnect in this case)
                        ws?.close()
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
