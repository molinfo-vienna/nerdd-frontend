import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"

type CustomExtraOptions = {
    baseUrlOverride?: string
}

const customFetchBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    CustomExtraOptions
> = async (args, api, extraOptions) => {
    const baseUrl = extraOptions?.baseUrlOverride || "/api"

    const baseQuery = fetchBaseQuery({
        baseUrl,
    })

    const result = await baseQuery(args, api, extraOptions)

    return result
}

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "nerddApi",
    refetchOnReconnect: true,
    baseQuery: customFetchBaseQuery,
    // we inject endpoints in other files of this directory
    // (e.g. jobs.js, modules.js, sources.js)
    endpoints: () => ({}),
})
