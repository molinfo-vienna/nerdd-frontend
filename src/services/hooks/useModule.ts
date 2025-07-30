import { Module } from "@/types/module"
import { skipToken } from "@reduxjs/toolkit/query"
import { useParams } from "react-router-dom"
import { useGetModuleQuery } from "../modules"
import RTKQueryError from "../RTKQueryError"

type UseModuleResult = {
    module?: Module
    isLoading: boolean
}

export function useModule(throwErrors: boolean = true): UseModuleResult {
    //
    // get current module
    // * e.g. LandingPage is module-independent so moduleId will be undefined
    // * e.g. CreateJobPage depends on module -> moduleId will be defined
    //
    const { moduleId } = useParams()

    const { data, isLoading, error } = useGetModuleQuery(moduleId ?? skipToken)

    if (error != null && throwErrors) {
        throw new RTKQueryError(error)
    }

    // for some reason, RTK query returns a cached module when skipToken (or skip option) is used
    return {
        module: moduleId != null ? data : undefined,
        isLoading,
    }
}
