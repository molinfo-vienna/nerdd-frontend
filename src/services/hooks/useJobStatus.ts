import { Job } from "@/types"
import { useParams } from "react-router-dom"
import RTKQueryError from "../RTKQueryError"
import { useGetJobStatusQuery } from "../jobs"

type UseJobStatusResult = {
    job: Job
    isLoading: boolean
}

export function useJobStatus(throwErrors: boolean = true): UseJobStatusResult {
    const { moduleId, jobId } = useParams()

    const {
        data: job,
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
        job,
        isLoading,
    }
}
