import { Module } from "@/types"
import { baseApi } from "./base"
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
    }),
})

export const { useGetModulesQuery, useGetModuleQuery } = modulesApi
