import { Module } from "@/types"
import { baseApi } from "./base"
import { normalizeModule } from "./normalize"
import recursiveSnakeToCamelCase from "./recursiveSnakeToCamelCase"

export const modulesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // TODO: return list of modules
        getModules: builder.query<Record<string, Module>, void>({
            query: () => {
                return `/modules/`
            },
            transformResponse: (response) => {
                // convert snake_case to camelCase
                const responseCamelCase = recursiveSnakeToCamelCase(response)

                // This query returns an array as response. We would like to access
                // modules by their names, e.g. modules["module_name"].
                // --> Convert array to object.
                const modules = {}
                for (const module of responseCamelCase) {
                    const normalizedModule = normalizeModule(module)
                    modules[normalizedModule.id] = normalizedModule
                }

                return modules
            },
        }),
        getModule: builder.query<Module, string>({
            query: (moduleId) => {
                return `/modules/${moduleId}`
            },
            transformResponse: (response) => {
                // convert snake_case to camelCase
                const moduleCamelCase = recursiveSnakeToCamelCase(response)

                return normalizeModule(moduleCamelCase)
            },
        }),
    }),
})

export const { useGetModulesQuery, useGetModuleQuery } = modulesApi
