import { useAppDispatch, useDevelopmentAppStore } from "@/app/hooks"
import {
    createJob,
    createSource,
    DebugJob,
    deleteJob,
    deleteSource,
} from "@/features/debug/debugSlice"
import { baseApi } from "@/services"
import { Module } from "@/types"
import { createServer, Response } from "miragejs"
import { Fragment, useEffect } from "react"
import {
    generateModuleQueueStats,
    generateResults,
    jobId,
    sourceId,
} from "./fake"
import JobStatusWebSocketMockServer from "./JobStatusWebSocketMockServer"
import recursiveCamelToSnakeCase from "./recursiveCamelToSnakeCase"
import ResultsGenerator from "./ResultsGenerator"
import ResultsWebSocketMockServer from "./ResultsWebSocketMockServer"

type MockServerProps = {
    enabled: boolean
    return404: boolean
    logRequests: boolean
    moduleConfigs: Record<string, Module>
    pageSize: number
    numResults: number
    predictionSpeed: number
    jobs: Record<string, DebugJob>
}

export default function MockServer({
    enabled,
    return404,
    logRequests,
    moduleConfigs,
    pageSize,
    numResults,
    predictionSpeed,
    jobs,
}: MockServerProps) {
    const dispatch = useAppDispatch()
    const store = useDevelopmentAppStore()

    // rest server
    useEffect(() => {
        if (enabled) {
            const server = createServer({
                routes() {
                    // passthrough for static resources
                    // (do that first before defining the namespace /api)
                    this.passthrough(`/resources/**`)

                    this.namespace = "/api"

                    // POST /:jobType/jobs
                    // (create a job and return the job id)
                    this.post("/:jobType/jobs", (schema, request) => {
                        // get correct module
                        const jobType = request.params.jobType

                        const sources =
                            request.requestBody.getAll("sources") || []

                        // check if all specified sources exist
                        if (sources !== undefined) {
                            for (const source of sources) {
                                if (
                                    !(source in store.getState().debug.sources)
                                ) {
                                    return new Response(
                                        400,
                                        {},
                                        recursiveCamelToSnakeCase({
                                            error: `Source ${source} not found`,
                                        }),
                                    )
                                }
                            }
                        }

                        // parameters are all entries in body that are not "sources" and "inputs"
                        const params = Object.fromEntries(
                            request.requestBody
                                .entries()
                                .filter(
                                    ([key, value]) =>
                                        key !== "sources" && key !== "inputs",
                                ),
                        )

                        // create a new job
                        const newJobId = jobId()
                        dispatch(
                            createJob({
                                jobId: newJobId,
                                jobType,
                                params,
                                numResults,
                            }),
                        )

                        const job = store.getState().debug.jobs[newJobId]

                        const jobResponse = {
                            ...job,
                            createdAt: new Date(job.createdAt),
                            pageSize,
                            // censor numEntriesTotal if showNumEntriesTotal is false
                            numEntriesTotal: job.showNumEntriesTotal
                                ? job.numEntriesTotal
                                : undefined,
                            numPagesTotal: job.showNumEntriesTotal
                                ? Math.ceil(job.numEntriesTotal / pageSize)
                                : undefined,
                        }

                        return recursiveCamelToSnakeCase(jobResponse)
                    })

                    // DELETE /:jobType/jobs/:jobId
                    // (delete a job)
                    this.delete("/:jobType/jobs/:jobId", (schema, request) => {
                        const jobId = request.params.jobId

                        // delete the job
                        dispatch(
                            deleteJob({
                                jobId: jobId,
                            }),
                        )

                        return new Response(204)
                    })

                    // GET /:jobType/jobs/:jobId
                    // (return the job status)
                    this.get("/:jobType/jobs/:jobId", (schema, request) => {
                        if (return404) {
                            return new Response(
                                404,
                                {},
                                recursiveCamelToSnakeCase({
                                    error: "Job not found",
                                }),
                            )
                        }

                        const jobType = request.params.jobType
                        const jobId = request.params.jobId

                        const jobs = store.getState().debug.jobs
                        let job = jobs[jobId]
                        if (job === undefined) {
                            dispatch(
                                createJob({
                                    jobId,
                                    jobType,
                                    params: {},
                                    numResults,
                                }),
                            )

                            job = store.getState().debug.jobs[jobId]
                        }

                        const jobResponse = {
                            ...job,
                            createdAt: new Date(job.createdAt),
                            pageSize,
                            // censor numEntriesTotal if showNumEntriesTotal is false
                            numEntriesTotal: job.showNumEntriesTotal
                                ? job.numEntriesTotal
                                : undefined,
                            showNumEntriesTotal: undefined,
                            numPagesTotal: job.showNumEntriesTotal
                                ? Math.ceil(job.numEntriesTotal / pageSize)
                                : undefined,
                        }

                        return recursiveCamelToSnakeCase(jobResponse)
                    })

                    // GET /:jobType/jobs/:jobId/results
                    // (return results for a job)
                    this.get(
                        "/:jobType/jobs/:jobId/results",
                        (schema, request) => {
                            if (return404) {
                                return new Response(
                                    404,
                                    {},
                                    { error: "Invalid page" },
                                )
                            }

                            const incomplete =
                                request.queryParams.incomplete === "true" ||
                                false

                            const jobType = request.params.jobType
                            const jobId = request.params.jobId
                            const pageOneBased =
                                parseInt(request.queryParams.page) || 1

                            // adapt pageId to 0-based indexing
                            const page = pageOneBased > 0 ? pageOneBased - 1 : 0

                            // find the corresponding module (or return 404)
                            const jobs = store.getState().debug.jobs
                            let job = jobs[jobId]
                            if (job === undefined) {
                                dispatch(
                                    createJob({
                                        jobId,
                                        jobType,
                                        params: {},
                                        numResults,
                                    }),
                                )

                                job = store.getState().debug.jobs[jobId]
                            }

                            const jobResponse = {
                                ...job,
                                createdAt: new Date(job.createdAt),
                                pageSize,
                                // censor numEntriesTotal if showNumEntriesTotal is false
                                numEntriesTotal: job.showNumEntriesTotal
                                    ? job.numEntriesTotal
                                    : undefined,
                                showNumEntriesTotal: undefined,
                                numPagesTotal: job.showNumEntriesTotal
                                    ? Math.ceil(job.numEntriesTotal / pageSize)
                                    : undefined,
                            }

                            const moduleConfig = moduleConfigs[job.jobType]

                            const numEntriesProcessed =
                                job.numEntriesProcessed ?? 0
                            const numEntriesTotal = job.numEntriesTotal ?? 0

                            const numPagesTotal = Math.ceil(
                                numEntriesTotal / pageSize,
                            )

                            // number of processed pages
                            // first term: number of full pages processed
                            // second term: last page (if total number of entries
                            // is not divisible by pageSize)
                            const numPagesProcessed =
                                Math.floor(numEntriesProcessed / pageSize) +
                                (numEntriesTotal % pageSize !== 0 &&
                                    numEntriesProcessed === numEntriesTotal)

                            // check if page is valid
                            if (
                                page < 0 ||
                                (page > numPagesProcessed && !incomplete) ||
                                (page >= numPagesTotal && incomplete)
                            ) {
                                return new Response(
                                    404,
                                    {},
                                    { error: "Invalid page" },
                                )
                            }

                            // number of results on the current page
                            // e.g. numEntriesProcessed = 23, pageSize = 10, page = 2
                            // (note: page = 2 means the third page)
                            // -> 23 - 2 * 10 = 3 results on the current page
                            // (correct, because two pages with 10 results each are full
                            // and the third page has 3 results)
                            const actualPageSize = Math.min(
                                pageSize,
                                Math.max(
                                    0,
                                    numEntriesProcessed - page * pageSize,
                                ),
                            )

                            // maximum number of results possible on the current page
                            // e.g. numEntriesTotal = 43, pageSize = 10, page = 2
                            // -> 43 - 2 * 10 = 23
                            // -> min(10, 23) = 10
                            const maxPageSize = Math.min(
                                pageSize,
                                Math.max(numEntriesTotal - page * pageSize, 0),
                            )

                            // if incomplete, return the actual page size
                            // otherwise:
                            // a) page is full -> return the actual page size
                            // b) page is not full -> return 0
                            const realizedPageSize = incomplete
                                ? actualPageSize
                                : (actualPageSize === maxPageSize) * maxPageSize

                            // generate fake results
                            const results = generateResults(
                                moduleConfig,
                                page * pageSize,
                                realizedPageSize,
                            )

                            const previousUrl =
                                page > 0
                                    ? `/jobs/${jobId}/results?page=${page - 1}`
                                    : null
                            const nextUrl =
                                (page + 1) * pageSize < results.length
                                    ? `/jobs/${jobId}/results?page=${page + 1}`
                                    : null

                            return recursiveCamelToSnakeCase({
                                data: results,
                                pagination: {
                                    page,
                                    pageSize,
                                    previousUrl,
                                    nextUrl,
                                    isIncomplete: actualPageSize < maxPageSize,
                                },
                                job: jobResponse,
                            })
                        },
                    )

                    // GET /jobs/:jobId/output.:format
                    // (download output file)
                    this.get("/jobs/:jobId/:format", (schema, request) => {
                        if (return404) {
                            return new Response(
                                404,
                                {},
                                recursiveCamelToSnakeCase({
                                    error: "Output file not found",
                                }),
                            )
                        }

                        const jobId = request.params.jobId
                        const format = request.params.format

                        const jobs = store.getState().debug.jobs
                        const job = jobs[jobId]
                        if (job === undefined) {
                            return new Response(
                                404,
                                {},
                                recursiveCamelToSnakeCase({
                                    error: "Job not found",
                                }),
                            )
                        }

                        const headers = {
                            "Content-Disposition": `attachment; filename="output.${format}"`,
                            "Content-Type": "application/octet-stream",
                        }

                        const fakeFileContent = "dsflkjhfdsaklfjhdsrfaljh"

                        return new Response(200, headers, fakeFileContent)
                    })

                    // GET /modules
                    // (return all module configs)
                    this.get("/modules", () => {
                        return Object.values(moduleConfigs)
                    })

                    // GET /modules/:jobType/logo
                    // (return all module configs)
                    this.get("/modules/:jobType/logo", (schema, request) => {
                        const jobType = request.params.jobType

                        if (return404 || moduleConfigs[jobType] == null) {
                            return new Response(
                                404,
                                {},
                                { detail: "Module not found" },
                            )
                        }

                        const moduleConfig = moduleConfigs[jobType]

                        return {}
                    })

                    // GET /modules/:jobType/publications
                    // (return all publications)
                    this.get(
                        "/modules/:jobType/publications",
                        (schema, request) => {
                            const jobType = request.params.jobType

                            if (return404 || moduleConfigs[jobType] == null) {
                                return new Response(
                                    404,
                                    {},
                                    { detail: "Module not found" },
                                )
                            }

                            const moduleConfig = moduleConfigs[jobType]

                            return []
                        },
                    )

                    // GET /modules
                    // (return all module configs)
                    this.get("/modules/:jobType", (schema, request) => {
                        const jobType = request.params.jobType

                        if (return404 || moduleConfigs[jobType] == null) {
                            return new Response(
                                404,
                                {},
                                { detail: "Module not found" },
                            )
                        }

                        return moduleConfigs[jobType]
                    })

                    // GET /modules/:jobType/queue
                    // (return module queue stats)
                    this.get("/modules/:jobType/queue", (schema, request) => {
                        const jobType = request.params.jobType

                        if (return404 || moduleConfigs[jobType] == null) {
                            return new Response(
                                404,
                                {},
                                { detail: "Module not found" },
                            )
                        }

                        // generate fake module stats
                        const queueStats = generateModuleQueueStats(jobType)

                        return queueStats
                    })

                    // PUT /sources/
                    // (add a source [molecular text representation or file])
                    this.put(
                        "/sources",
                        (schema, request) => {
                            if (return404) {
                                return new Response(
                                    404,
                                    {},
                                    { detail: "Route /sources not found" },
                                )
                            }

                            const file = request.requestBody.get("file")
                            const filename = file.name

                            const newSourceId = sourceId()
                            dispatch(
                                createSource({
                                    sourceId: newSourceId,
                                    filename,
                                }),
                            )

                            const source =
                                store.getState().debug.sources[newSourceId]

                            return recursiveCamelToSnakeCase(source)
                        },
                        { timing: 5000 },
                    )

                    // DELETE /sources/:sourceId
                    // (delete a source)
                    this.delete(
                        "/sources/:sourceId",
                        (schema, request) => {
                            if (return404) {
                                return new Response(
                                    404,
                                    {},
                                    { detail: "Source id not found" },
                                )
                            }

                            const sourceId = request.params.sourceId

                            // delete the source
                            dispatch(
                                deleteSource({
                                    sourceId: sourceId,
                                }),
                            )

                            return new Response(204)
                        },
                        { timing: 5000 },
                    )
                },
            })

            // disable logging
            server.logging = logRequests

            // we started / stopped a mock server
            // -> invalidate all RTK query caches
            // -> trigger a re-fetch of all queries
            setTimeout(() => {
                dispatch(baseApi.util.resetApiState())
            }, 0)

            return () => {
                server.shutdown()
            }
        } else {
            // we disabled the mock server
            // -> invalidate all RTK query caches
            // -> trigger a re-fetch of all queries
            setTimeout(() => {
                dispatch(baseApi.util.resetApiState())
            }, 0)
        }
    }, [
        moduleConfigs,
        numResults,
        pageSize,
        dispatch,
        return404,
        logRequests,
        enabled,
        store,
    ])

    return (
        <>
            {Object.values(jobs).map((job) => (
                <Fragment key={job.id}>
                    <ResultsGenerator
                        job={job}
                        predictionSpeed={predictionSpeed}
                    />
                    <JobStatusWebSocketMockServer
                        job={job}
                        pageSize={pageSize}
                    />
                    <ResultsWebSocketMockServer job={job} pageSize={pageSize} />
                </Fragment>
            ))}
        </>
    )
}
