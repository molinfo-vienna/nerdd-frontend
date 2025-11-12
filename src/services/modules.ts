import { Module, QueueStats } from "@/types"
import { baseApi } from "./api"
import { normalizeModule } from "./normalize"
import recursiveSnakeToCamelCase from "./recursiveSnakeToCamelCase"

export const modulesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getModules: builder.query<Module[], void>({
            query: () => "/modules",
            transformResponse: (response) => {
                // convert snake_case to camelCase
                const responseCamelCase = recursiveSnakeToCamelCase(response)

                // normalize each module and sort them by rank
                const modules = responseCamelCase
                    .map(normalizeModule)
                    .sort((a, b) => {
                        if (a.rank < b.rank) {
                            return -1
                        }
                        if (a.rank > b.rank) {
                            return 1
                        }
                        return 0
                    })

                return modules
            },
        }),
        getModule: builder.query<Module, string>({
            query: (moduleId) => `/modules/${moduleId}`,
            transformResponse: (response) => {
                // convert snake_case to camelCase
                const moduleCamelCase = recursiveSnakeToCamelCase(response)

                return normalizeModule(moduleCamelCase)
            },
        }),
        getModulePublications: builder.query<Module, string>({
            query: (moduleId) => `/modules/${moduleId}/publications`,
        }),
        getModuleQueueStats: builder.query<QueueStats, string>({
            query: (moduleId) => `/modules/${moduleId}/queue`,
            transformResponse: (response) => {
                // convert snake_case to camelCase
                const statsCamelCase = recursiveSnakeToCamelCase(response)
                return statsCamelCase as QueueStats
            },
        }),
    }),
})

export const {
    useGetModulesQuery,
    useGetModuleQuery,
    useGetModulePublicationsQuery,
    useGetModuleQueueStatsQuery,
} = modulesApi
