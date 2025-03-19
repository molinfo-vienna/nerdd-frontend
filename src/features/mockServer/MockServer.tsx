import { createServer, Response } from "miragejs"
import { Fragment, useEffect } from "react"
import { useDispatch, useStore } from "react-redux"
import { nerddApi } from "../../services"
import {
    createJob,
    createSource,
    deleteJob,
    deleteSource,
    incrementKey,
} from "../debug/debugSlice"
import { generateResults, jobId, sourceId } from "./fake"
import JobStatusWebSocketMockServer from "./JobStatusWebSocketMockServer"
import recursiveCamelToSnakeCase from "./recursiveCamelToSnakeCase"
import ResultsGenerator from "./ResultsGenerator"
import ResultsWebSocketMockServer from "./ResultsWebSocketMockServer"

type MockServerProps = {
    enabled: boolean;
    return404: boolean;
    logRequests: boolean;
    moduleConfigs: Record<string, any>;
    pageSize: number;
    numResults: number;
    predictionSpeed: number;
    jobs: Record<string, any>;
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
    const dispatch = useDispatch()
    const store = useStore()

    // rest server
    useEffect(() => {
        if (enabled) {
            const server = createServer({
                routes() {
                    this.namespace = "/api"

                    // Dynamically passthrough absolute URLs with the current port (for Vite)
                    const port = window.location.port
                    const hostname = window.location.hostname
                    if (port) {
                        this.passthrough(
                            `http://${hostname}:${port}/resources/**`,
                        )
                    }

                    // POST /jobs
                    // (create a job and return the job id)
                    this.post("/:moduleId/jobs", (schema, request) => {
                        // get correct module
                        const moduleId = request.params.moduleId

                        let entry = request.requestBody.get("job")

                        const body = JSON.parse(entry)

                        // if body.input is an object, check if all specified sources exist
                        const sources = body.sources
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
                            Object.entries(body).filter(
                                ([key, value]) =>
                                    key !== "sources" && key !== "inputs",
                            ),
                        )

                        // create a new job
                        const newJobId = jobId()
                        dispatch(
                            createJob({
                                jobId: newJobId,
                                jobType: moduleId,
                                params,
                                numResults,
                            }),
                        )

                        const state = store.getState()
                        const job = state.debug.jobs[newJobId]

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

                    // DELETE /jobs/:jobId
                    // (delete a job)
                    this.delete("/:moduleId/jobs/:jobId", (schema, request) => {
                        const jobId = request.params.jobId

                        // delete the job
                        dispatch(
                            deleteJob({
                                jobId: jobId,
                            }),
                        )

                        return new Response(204)
                    })

                    // GET /jobs/:jobId
                    // (return the job status)
                    this.get("/:moduleId/jobs/:jobId", (schema, request) => {
                        if (return404) {
                            return new Response(
                                404,
                                {},
                                recursiveCamelToSnakeCase({
                                    error: "Job not found",
                                }),
                            )
                        }

                        const moduleId = request.params.moduleId
                        const jobId = request.params.jobId

                        let jobs = store.getState().debug.jobs
                        let job = jobs[jobId]
                        if (job === undefined) {
                            dispatch(
                                createJob({
                                    jobId,
                                    jobType: moduleId,
                                    params: {},
                                    numResults,
                                }),
                            )

                            const state = store.getState()
                            job = state.debug.jobs[jobId]
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

                    // GET /jobs/:jobId/results
                    // (return results for a job)
                    this.get(
                        "/:moduleId/jobs/:jobId/results",
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

                            const moduleId = request.params.moduleId
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
                                        jobType: moduleId,
                                        params: {},
                                        numResults,
                                    }),
                                )

                                const state = store.getState()
                                job = state.debug.jobs[jobId]
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

                    // GET /modules
                    // (return all module configs)
                    this.get("/modules", () => {
                        return Object.values(moduleConfigs)
                    })

                    // GET /modules
                    // (return all module configs)
                    this.get("/modules/:moduleId/", (schema, request) => {
                        const moduleId = request.params.moduleId

                        if (
                            return404 ||
                            moduleConfigs[moduleId] === undefined
                        ) {
                            return new Response(
                                404,
                                {},
                                { detail: "Module not found" },
                            )
                        }

                        return moduleConfigs[moduleId]
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

                            // let reader = new FileReader()

                            // reader.readAsText(request.requestBody.get("file"))

                            // reader.onload = function () {
                            //     console.log(reader.result)
                            // }

                            // reader.onerror = function () {
                            //     console.log(reader.error)
                            // }

                            const newSourceId = sourceId()
                            dispatch(
                                createSource({
                                    sourceId: newSourceId,
                                    filename,
                                }),
                            )

                            const state = store.getState()
                            const source = state.debug.sources[newSourceId]

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
            // also: increment the key to force a re-render of all components
            // reason: UI might have state that should be reset
            dispatch(nerddApi.util.resetApiState())
            dispatch(incrementKey())

            return () => {
                server.shutdown()
            }
        } else {
            // we disabled the mock server
            // -> invalidate all RTK query caches
            // -> trigger a re-fetch of all queries
            // also: increment the key to force a re-render of all components
            // reason: UI might have state that should be reset
            dispatch(nerddApi.util.resetApiState())
            dispatch(incrementKey())
        }
    }, [
        moduleConfigs,
        numResults,
        pageSize,
        dispatch,
        return404,
        logRequests,
        enabled,
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
