import { JobStatus } from "@/types"
import { useParams } from "react-router-dom"
import RTKQueryError from "../RTKQueryError"
import { useGetJobStatusQuery } from "../jobs"

type UseJobStatusResult = {
    jobStatus: JobStatus
    isLoading: boolean
}

export function useJobStatus(throwErrors: boolean = true): UseJobStatusResult {
    const { moduleId, jobId } = useParams()

    const {
        data: jobStatus,
        error,
        isLoading,
    } = useGetJobStatusQuery(
        { moduleId, jobId },
        {
            skip: moduleId === undefined || jobId === undefined,
        },
    )

    if (error != null && throwErrors) {
        throw new RTKQueryError(error)
    }

    return {
        jobStatus,
        isLoading,
    }
}
