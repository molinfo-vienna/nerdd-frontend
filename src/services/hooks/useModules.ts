import { Module } from "@/types/module"
import { useGetModulesQuery } from "../modules"
import RTKQueryError from "../RTKQueryError"

type UseModulesResult = {
    modules?: Module[]
    isLoading: boolean
}

export function useModules(throwErrors: boolean = true): UseModulesResult {
    const { data, isLoading, error } = useGetModulesQuery()

    if (error != null && throwErrors) {
        throw new RTKQueryError(error)
    }

    return {
        modules: data,
        isLoading,
    }
}
