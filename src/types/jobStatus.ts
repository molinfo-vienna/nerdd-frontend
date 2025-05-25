import OutputFile from "./outputFile"

export interface JobStatus {
    id: string
    numEntriesProcessed?: number
    numEntriesTotal?: number
    outputFiles: OutputFile[]
}

export default JobStatus
