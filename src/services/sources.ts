import { Source } from "@/types"
import { baseApi } from "./api"
import recursiveSnakeToCamelCase from "./recursiveSnakeToCamelCase"

export interface AddSourceArgs {
    file: File
    onUploadProgress: (uploadProgress: number) => void
}

export interface DeleteSourceArgs {
    sourceId: string
}

export const sourcesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addSource: builder.mutation<Source, AddSourceArgs>({
            query: ({ file, onUploadProgress }) => {
                const body = new FormData()
                body.append("file", file)

                return {
                    url: "/sources",
                    method: "PUT",
                    body,
                    onUploadProgress,
                }
            },
            transformResponse: recursiveSnakeToCamelCase,
        }),
        deleteSource: builder.mutation<Source, DeleteSourceArgs>({
            query: ({ sourceId }) => ({
                url: `/sources/${sourceId}`,
                method: "DELETE",
            }),
            transformResponse: recursiveSnakeToCamelCase,
        }),
    }),
})

export const { useAddSourceMutation, useDeleteSourceMutation } = sourcesApi
