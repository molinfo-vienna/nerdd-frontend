import { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { type CustomQueryFn } from "./custom"

export type UploadProgressBaseQueryArgs = {
    baseUrl?: string
}

export type UploadProgressArgs = FetchArgs & {
    onUploadProgress: (uploadProgress: number) => void
}

export function uploadProgressBaseQuery({
    baseUrl = "/",
}: UploadProgressBaseQueryArgs = {}): CustomQueryFn<UploadProgressArgs> {
    return async (args, api /*, extraOptions*/) => {
        return await new Promise<
            { data: unknown } | { error: FetchBaseQueryError }
        >((resolve) => {
            //
            // build full url (handle both absolute and relative urls)
            //
            let url
            if (
                args.url.startsWith("http://") ||
                args.url.startsWith("https://")
            ) {
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
}
