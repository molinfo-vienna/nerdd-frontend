import OutputFile from "./outputFile"

export interface JobStatus {
    status?: string
    progress?: number
    message?: string
    startTime?: string // ISO date string
    endTime?: string // ISO date string
    numEntriesProcessed?: number
    numEntriesTotal?: number
    outputFiles: OutputFile[]
}

export default JobStatus
