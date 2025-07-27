import { baseApi } from "./base"

export const resourcesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getResource: builder.query({
            query: (url) => ({
                url,
                responseHandler: (response) => response.text(),
            }),
            extraOptions: { baseUrlOverride: "/" },
        }),
    }),
})

export const { useGetResourceQuery } = resourcesApi
