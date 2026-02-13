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

type UploadProgressFetchArgs = FetchArgs & {
    onUploadProgress: (uploadProgress: number) => void
}

const xhrBaseQuery: BaseQueryFn<
    UploadProgressFetchArgs,
    unknown,
    FetchBaseQueryError,
    CustomExtraOptions
> = async (args, api, extraOptions) => {
    return await new Promise<
        { data: unknown } | { error: FetchBaseQueryError }
    >((resolve) => {
        //
        // build full url (handle both absolute and relative urls)
        //
        const baseUrl = extraOptions?.baseUrlOverride || "/api"
        let url
        if (args.url.startsWith("http://") || args.url.startsWith("https://")) {
            url = args.url
        } else {
            const normalizedBaseUrl = baseUrl.endsWith("/")
                ? baseUrl.slice(0, -1)
                : baseUrl
            const normalizedUrl = args.url.startsWith("/")
                ? args.url
                : `/${args.url}`

            url = `${normalizedBaseUrl}${normalizedUrl}`
        }

        //
        // mimic fetchBaseQuery's behavior for building the request
        //
        const xhr = new XMLHttpRequest()
        const onAbort = () => xhr.abort()
        api.signal.addEventListener("abort", onAbort)

        xhr.open(args.method ?? "GET", url)
        xhr.responseType = "text"

        if (args.headers !== undefined) {
            const headers = new Headers(args.headers)
            headers.forEach((value, key) => {
                xhr.setRequestHeader(key, value)
            })
        }

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                args.onUploadProgress(
                    Math.round((event.loaded / event.total) * 100),
                )
            }
        }

        xhr.onload = () => {
            api.signal.removeEventListener("abort", onAbort)

            const contentType = xhr.getResponseHeader("content-type") || ""
            const responseText = xhr.responseText
            let responseData: unknown = null

            if (responseText.length > 0) {
                if (contentType.includes("application/json")) {
                    try {
                        responseData = JSON.parse(responseText)
                    } catch {
                        responseData = responseText
                    }
                } else {
                    responseData = responseText
                }
            }

            if (xhr.status >= 200 && xhr.status < 300) {
                resolve({ data: responseData })
                return
            }

            resolve({
                error: {
                    status: xhr.status,
                    data: responseData,
                },
            })
        }

        xhr.onerror = () => {
            api.signal.removeEventListener("abort", onAbort)
            resolve({
                error: {
                    status: "FETCH_ERROR",
                    error: "Network request failed",
                },
            })
        }

        xhr.onabort = () => {
            api.signal.removeEventListener("abort", onAbort)
            resolve({
                error: {
                    status: "CUSTOM_ERROR",
                    error: "AbortError",
                },
            })
        }

        xhr.send(args.body as XMLHttpRequestBodyInit)
    })
}

const customFetchBaseQuery: BaseQueryFn<
    string | UploadProgressFetchArgs,
    unknown,
    FetchBaseQueryError,
    CustomExtraOptions
> = async (args, api, extraOptions) => {
    // if args has onUploadProgress callback, use xhrBaseQuery to support upload progress tracking
    if (
        typeof args !== "string" &&
        typeof args.onUploadProgress === "function"
    ) {
        // BaseQueryFn for progress tracking
        return await xhrBaseQuery(args, api, extraOptions)
    } else {
        // BaseQueryFn for regular requests (without progress tracking)
        const baseQuery = fetchBaseQuery({
            // override base url if necessary
            baseUrl: extraOptions?.baseUrlOverride || "/api",
        })

        return await baseQuery(args, api, extraOptions)
    }
}

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "nerddApi",
    refetchOnReconnect: true,
    // we use a custom base query that
    // (1) supports upload progress tracking in file uploads and
    // (2) allows overriding the base url on a per-request basis (see ./resources.ts for an example)
    baseQuery: customFetchBaseQuery,
    // we inject endpoints in other files of this directory
    // (e.g. jobs.js, modules.js, sources.js)
    endpoints: () => ({}),
})
