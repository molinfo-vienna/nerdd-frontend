import { createApi } from "@reduxjs/toolkit/query/react"
import { mergedBaseQuery } from "./baseQuery"

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "nerddApi",
    refetchOnReconnect: true,
    // we use a custom base query that
    // (1) supports upload progress tracking in file uploads and
    // (2) allows overriding the base url on a per-request basis (see ./resources.ts for an example)
    baseQuery: mergedBaseQuery({ baseUrl: "/api" }),
    // we inject endpoints in other files of this directory
    // (e.g. jobs.js, modules.js, sources.js)
    endpoints: () => ({}),
})
