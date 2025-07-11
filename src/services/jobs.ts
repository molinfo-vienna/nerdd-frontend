import { JobStatus } from "@/types"
import { baseApi } from "./base"
import recursiveSnakeToCamelCase from "./recursiveSnakeToCamelCase"
import websocketQuery from "./websocketQuery"

export const jobsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addJob: builder.mutation<
            JobStatus,
            {
                moduleId: string
                inputs: string[]
                sources: string[]
                params: Record<string, any>
            }
        >({
            query: ({ moduleId, inputs, sources, params }) => {
                const form = new FormData()

                // add inputs
                for (const input of inputs) {
                    form.append("inputs", input)
                }

                // add sources
                for (const source of sources) {
                    form.append("sources", source)
                }

                // add params
                for (const key in params) {
                    form.append(key, params[key])
                }

                return {
                    url: `${moduleId}/jobs/`,
                    method: "POST",
                    body: form,
                }
            },
            // The response is an object with keys in snake_case. We want to convert
            // them to camelCase for consistency with the rest of the frontend.
            // (e.g. module.visible_name -> module.visibleName)
            transformResponse: recursiveSnakeToCamelCase,
        }),
        deleteJob: builder.mutation({
            query: ({ moduleId, jobId }) => ({
                url: `${moduleId}/jobs/${jobId}/`,
                method: "DELETE",
            }),
            transformResponse: recursiveSnakeToCamelCase,
        }),
        getJobStatus: websocketQuery({
            builder,
            query: ({ moduleId, jobId }) => `/${moduleId}/jobs/${jobId}/`,
            queryWs: ({ moduleId, jobId }) =>
                `websocket/${moduleId}/jobs/${jobId}/`,
            process: (draft, data, complete) => {
                if (complete) {
                    return
                }
                // always overwrite the current job status with the retrieved data
                // (returning a new object is equivalent with a replacement)
                return data
            },
            transformResponse: recursiveSnakeToCamelCase,
            transformResponseWs: recursiveSnakeToCamelCase,
        }),
    }),
})

export const { useAddJobMutation, useDeleteJobMutation, useGetJobStatusQuery } =
    jobsApi
