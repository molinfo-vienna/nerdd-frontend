import OutputFile from "./outputFile"

export interface Job {
    id: string
    jobType: string
    sourceId: string
    params: Record<string, any>
    createdAt: Date
    status: string
    entriesProcessed?: Array<[number, number]>
    numEntriesTotal?: number
    numEntriesProcessed: number
    numPagesTotal?: number
    numPagesProcessed: number
    pageSize?: number
    outputFiles?: OutputFile[]
    jobUrl: string
    resultsUrl: string
}

export default Job
