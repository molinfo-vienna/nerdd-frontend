import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import hash from "object-hash"
import { normalizeModule } from "./normalize"
import recursiveSnakeToCamelCase from "./recursiveSnakeToCamelCase"
import websocketQuery from "./websocketQuery"

// Define a service using a base URL and expected endpoints
export const nerddApi = createApi({
    reducerPath: "nerddApi",
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: `/api`,
    }),
    endpoints: (builder) => ({
        addJob: builder.mutation({
            query: ({ moduleId, data }) => {
                const form = new FormData()
                for (const key in data) {
                    form.append(key, JSON.stringify(data[key]))
                }

                return {
                    url: `/${moduleId}/jobs`,
                    method: "POST",
                    body: form,
                }
            },
            // The response is an object with keys in snake_case. We want to convert
            // them to camelCase for consistency with the rest of the frontend.
            // (e.g. module.visible_name -> module.visibleName)
            transformResponse: recursiveSnakeToCamelCase,
        }),
        addSource: builder.mutation({
            query: ({ file }) => {
                const body = new FormData()
                body.append("file", file)

                return {
                    url: `/sources`,
                    method: "PUT",
                    body,
                }
            },
            transformResponse: recursiveSnakeToCamelCase,
        }),
        deleteSource: builder.mutation({
            query: ({ sourceId }) => ({
                url: `/sources/${sourceId}`,
                method: "DELETE",
            }),
            transformResponse: recursiveSnakeToCamelCase,
        }),
        deleteJob: builder.mutation({
            query: ({ moduleId, jobId }) => ({
                url: `/${moduleId}/jobs/${jobId}`,
                method: "DELETE",
            }),
            transformResponse: recursiveSnakeToCamelCase,
        }),
        getModules: builder.query({
            query: () => {
                return `/modules`
            },
            transformResponse: (response) => {
                // convert snake_case to camelCase
                const responseCamelCase = recursiveSnakeToCamelCase(response)

                // This query returns an array as response. We would like to access
                // modules by their names, e.g. modules["module_name"].
                // --> Convert array to object.
                const modules = {}
                for (const module of responseCamelCase) {
                    modules[module.id] = normalizeModule(module)
                }

                return modules
            },
        }),
        getModule: builder.query({
            query: (moduleId) => {
                return `/modules/${moduleId}`
            },
            transformResponse: (response) => {
                // convert snake_case to camelCase
                const moduleCamelCase = recursiveSnakeToCamelCase(response)

                return normalizeModule(moduleCamelCase)
            },
        }),

        getJobStatus: websocketQuery({
            builder,
            query: ({ moduleId, jobId }) => `/${moduleId}/jobs/${jobId}`,
            queryWs: ({ moduleId, jobId }) =>
                `/websocket/${moduleId}/jobs/${jobId}`,
            process: (draft, data) => data,
            transformResponse: recursiveSnakeToCamelCase,
            transformResponseWs: recursiveSnakeToCamelCase,
        }),

        getResults: websocketQuery({
            builder,
            query: ({ moduleId, jobId, page }) =>
                `/${moduleId}/jobs/${jobId}/results?page=${page}&return_incomplete=true`,
            queryWs: ({ moduleId, jobId, page }) =>
                `/websocket/${moduleId}/jobs/${jobId}/results?page=${page}`,
            process: (draft, data, complete) => {
                if (complete) {
                    draft.isIncomplete = false
                    return
                }

                // create a hash from data
                const dataHash = hash(data)

                // check if the data is already in the draft
                for (const entry of draft.data) {
                    if (hash(entry) === dataHash) {
                        return
                    }
                }

                draft.data.push(data)

                // return nothing to signal that the draft has been modified
                return
            },
            transformResponse: (response) => {
                return {
                    data: response.data,
                    isIncomplete: response.pagination?.is_incomplete || false,
                }
            },
            transformResponseWs: (response) => response,
        }),
    }),
})

export const {
    useAddJobMutation,
    useAddSourceMutation,
    useDeleteSourceMutation,
    useDeleteJobMutation,
    useGetModulesQuery,
    useGetModuleQuery,
    useGetResultsQuery,
    useGetJobStatusQuery,
} = nerddApi
