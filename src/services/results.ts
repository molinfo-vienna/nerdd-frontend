import { baseApi } from "./api"
import websocketQuery from "./websocketQuery"

// Define a service using a base URL and expected endpoints
export const resultsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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

                // check if the data is already in the draft
                for (const entry of draft.data) {
                    if (entry.id == data.id) {
                        return
                    }
                }

                // TODO: add debounce
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

export const { useGetResultsQuery } = resultsApi
