import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "nerddApi",
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: `/api`,
    }),
    // we inject endpoints in other files of this directory
    // (e.g. jobs.js, modules.js, sources.js)
    endpoints: () => ({}),
})
