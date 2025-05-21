import { baseApi } from "./base"
import recursiveSnakeToCamelCase from "./recursiveSnakeToCamelCase"

export const sourcesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addSource: builder.mutation({
            query: ({ file }) => {
                const body = new FormData()
                body.append("file", file)

                return {
                    url: "sources",
                    method: "PUT",
                    body,
                }
            },
            transformResponse: recursiveSnakeToCamelCase,
        }),
        deleteSource: builder.mutation({
            query: ({ sourceId }) => ({
                url: `sources/${sourceId}`,
                method: "DELETE",
            }),
            transformResponse: recursiveSnakeToCamelCase,
        }),
    }),
})

export const { useAddSourceMutation, useDeleteSourceMutation } = sourcesApi
