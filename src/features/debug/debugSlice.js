import { createSlice } from "@reduxjs/toolkit"
import { generateModuleConfigDict } from "../mockServer/fake/modules"

const initialState = {
    // increment this key to force re-render of components
    key: 0,

    // module configs
    moduleConfigs: generateModuleConfigDict(8),
    // jobs
    jobs: {},
    // sources
    sources: {},
}

const debugSlice = createSlice({
    name: "debug",
    initialState,
    reducers: {
        incrementKey(state, action) {
            return { ...state, key: state.key + 1 }
        },
        setNumModules(state, action) {
            const numModules = action.payload
            let moduleConfigs
            if (Object.keys(state.moduleConfigs).length !== numModules) {
                // generate fake modules
                moduleConfigs = generateModuleConfigDict(numModules)
            } else {
                moduleConfigs = { ...state.moduleConfigs }
            }

            return {
                ...state,
                moduleConfigs,
            }
        },
        createJob(state, action) {
            const { jobId, parameters, moduleName, numResults } = action.payload

            return {
                ...state,
                jobs: {
                    ...state.jobs,
                    [jobId]: {
                        id: jobId,
                        moduleName,
                        parameters,
                        numEntriesProcessed: 0,
                        numEntriesTotal: numResults,
                        showNumEntriesTotal: false,
                    },
                },
            }
        },
        deleteJob(state, action) {
            const jobId = action.payload.jobId
            const jobs = { ...state.jobs }
            delete jobs[jobId]

            return {
                ...state,
                jobs,
            }
        },
        createSource(state, action) {
            const { sourceId, filename } = action.payload

            return {
                ...state,
                sources: {
                    ...state.sources,
                    [sourceId]: {
                        id: sourceId,
                        timestamp: Date.now(),
                        format: "",
                        filename: filename,
                    },
                },
            }
        },
        deleteSource(state, action) {
            const sourceId = action.payload.sourceId
            const sources = { ...state.sources }
            delete sources[sourceId]

            return {
                ...state,
                sources,
            }
        },
        addMolecule(state, action) {
            const jobId = action.payload
            const job = state.jobs[jobId]
            const numEntriesProcessed = job.numEntriesProcessed
            const numEntriesTotal = job.numEntriesTotal

            return {
                ...state,
                jobs: {
                    ...state.jobs,
                    [jobId]: {
                        ...state.jobs[jobId],
                        numEntriesProcessed: Math.min(
                            numEntriesProcessed + 1,
                            numEntriesTotal,
                        ),
                    },
                },
            }
        },
        setNumEntriesTotal(state, action) {
            const { jobId } = action.payload

            return {
                ...state,
                jobs: {
                    ...state.jobs,
                    [jobId]: {
                        ...state.jobs[jobId],
                        showNumEntriesTotal: true,
                    },
                },
            }
        },
    },
})

export const {
    incrementKey,
    createJob,
    deleteJob,
    createSource,
    deleteSource,
    addMolecule,
    setNumModules,
    setNumEntriesTotal,
} = debugSlice.actions

export default debugSlice.reducer
