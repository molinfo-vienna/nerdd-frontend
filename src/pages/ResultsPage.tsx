import { useAppDispatch, useAppSelector } from "@/app/hooks"
import Pagination from "@/features/pagination/Pagination"
import ColorSelectActionButton from "@/features/resultsHeader/ColorSelectActionButton"
import ColumnSelectActionButton from "@/features/resultsHeader/ColumnSelectActionButton"
import DeleteActionButton from "@/features/resultsHeader/DeleteActionButton"
import DocsActionButton from "@/features/resultsHeader/DocsActionButton"
import DownloadActionButton from "@/features/resultsHeader/DownloadActionButton"
import ResultsHeader from "@/features/resultsHeader/ResultsHeader"
import ResultTable from "@/features/resultTable/ResultTable"
import {
    selectAtomColorProperty,
    selectAugmentedResultPropertyGroups,
    selectColumnRows,
    selectNumberOfResults,
    selectPossibleAtomColorProperties,
    selectResultsGroupedByMolId,
    selectVisibleResultProperties,
    setAtomColorProperty,
    setGroupVisibility,
    setResultProperties,
    setResultPropertyVisibility,
    setResults,
    setTask,
} from "@/features/resultTable/resultTableSlice"
import {
    useGetJobStatusQuery,
    useGetModuleQuery,
    useGetResultsQuery,
} from "@/services"
import { ResultProperty } from "@/types"
import { useCallback, useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import Layout from "./Layout"
import LoadingPage from "./LoadingPage"

export default function ResultsPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    //
    // get state
    //
    const visibleResultProperties = useAppSelector(
        selectVisibleResultProperties,
    )
    const augmentedResultPropertyGroups = useAppSelector(
        selectAugmentedResultPropertyGroups,
    )
    const atomColorProperty = useAppSelector(selectAtomColorProperty)
    const { firstColumnRow, secondColumnRow } = useAppSelector(selectColumnRows)
    const possibleAtomColorProperties = useAppSelector(
        selectPossibleAtomColorProperties,
    )
    const resultsGroupedByMolId = useAppSelector(selectResultsGroupedByMolId)
    const numberOfResults = useAppSelector(selectNumberOfResults)

    //
    // get parameters from url
    //

    // get the moduleId and jobId from the URL
    const { moduleId, jobId } = useParams()

    // get the (optional) page parameter from the URL (default to 1)
    const [searchParams, setSearchParams] = useSearchParams()
    const pageOneBased = parseInt(searchParams.get("page")) || 1

    useEffect(() => {
        if (pageOneBased <= 0) {
            navigate(`/${moduleId}/${jobId}`)
        }
    }, [pageOneBased, navigate, jobId, moduleId])

    //
    // fetch data
    //
    const {
        data: module,
        error: errorModule,
        isLoading: isLoadingModule,
    } = useGetModuleQuery(moduleId || "", {
        skip: moduleId === undefined,
    })

    const {
        data: results,
        error: errorResults,
        isLoading: isLoadingResults,
        isFetching: isFetchingResults,
    } = useGetResultsQuery(
        {
            moduleId,
            jobId,
            page: pageOneBased,
        },
        {
            skip: moduleId === undefined || jobId === undefined,
        },
    )

    const {
        data: jobStatus,
        error: errorJobStatus,
        isLoading: isLoadingJobStatus,
    } = useGetJobStatusQuery(
        { moduleId, jobId },
        {
            skip: moduleId === undefined || jobId === undefined,
        },
    )

    //
    // initialize state
    //
    useEffect(() => {
        if (module === undefined) {
            return
        }

        dispatch(setTask(module.task))
        dispatch(setResultProperties(module.resultProperties))
    }, [module, dispatch])

    useEffect(() => {
        if (results === undefined) {
            return
        }

        dispatch(setResults(results.data))
    }, [results, dispatch])

    //
    // column selection
    //
    const handleColumnToggle = useCallback(
        (propertyName: string, visible: boolean) => {
            dispatch(
                setResultPropertyVisibility({
                    propertyName,
                    visible,
                }),
            )
        },
        [dispatch],
    )
    const handleGroupToggle = useCallback(
        (groupName: string, visible: boolean) => {
            dispatch(setGroupVisibility({ groupName, visible }))
        },
        [dispatch],
    )

    //
    // atom color selection
    //
    const handleAtomColorPropertyChange = useCallback(
        (newAtomColorProperty: ResultProperty | undefined) => {
            dispatch(setAtomColorProperty(newAtomColorProperty))
        },
        [dispatch],
    )

    //
    // error handling
    //
    if (moduleId === undefined) {
        return ErrorPage({
            error: new Error("Module ID is not defined"),
        })
    }

    if (jobId === undefined) {
        return ErrorPage({
            error: new Error("Job ID is not defined"),
        })
    }

    if (errorModule) {
        return ErrorPage({ error: errorModule })
    }

    if (errorJobStatus) {
        return ErrorPage({
            error: errorJobStatus,
        })
    }

    if (errorResults) {
        return ErrorPage({ error: errorResults })
    }

    if (isLoadingModule || module === undefined || isLoadingJobStatus) {
        return LoadingPage()
    }

    //
    // status
    //
    const waitingForFirstResult =
        resultsGroupedByMolId.length === 0 ||
        isFetchingResults ||
        isLoadingResults

    return (
        <Layout>
            <Layout.Header>
                <ResultsHeader module={module} jobStatus={jobStatus}>
                    <DocsActionButton moduleId={moduleId} />
                    <ColumnSelectActionButton
                        resultPropertyGroups={augmentedResultPropertyGroups}
                        onColumnToggle={handleColumnToggle}
                        onGroupToggle={handleGroupToggle}
                    />
                    <ColorSelectActionButton
                        atomColorProperty={atomColorProperty}
                        possibleAtomColorProperties={
                            possibleAtomColorProperties
                        }
                        onAtomColorPropertyChange={
                            handleAtomColorPropertyChange
                        }
                    />
                    <DownloadActionButton jobStatus={jobStatus} />
                    <DeleteActionButton moduleId={moduleId} jobId={jobId} />
                </ResultsHeader>
            </Layout.Header>

            <div className="container-fluid py-4">
                <div className="row justify-content-center">
                    <div className="col-auto my-3">
                        <Pagination
                            moduleId={moduleId}
                            jobId={jobId}
                            currentPageOneBased={pageOneBased}
                        />
                    </div>
                </div>

                {!waitingForFirstResult && (
                    <>
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <div className="mx-auto">
                                    <div className="clearfix"></div>
                                    {numberOfResults > 0 && (
                                        <div>
                                            <ResultTable
                                                module={module}
                                                resultsGroupedByMolId={
                                                    resultsGroupedByMolId
                                                }
                                                firstColumnRow={firstColumnRow}
                                                secondColumnRow={
                                                    secondColumnRow
                                                }
                                                resultProperties={
                                                    visibleResultProperties
                                                }
                                                atomColorProperty={
                                                    atomColorProperty
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                                {numberOfResults > 1 && (
                                    <Pagination
                                        moduleId={moduleId}
                                        jobId={jobId}
                                        currentPageOneBased={pageOneBased}
                                        className="mx-auto position-absolute start-50 translate-middle-x"
                                    />
                                )}
                            </div>
                        </div>
                    </>
                )}

                {waitingForFirstResult && (
                    <div className="row justify-content-center">
                        <div className="col-md-auto mt-5 pt-5 text-center">
                            <div className="spinner-border" role="status"></div>
                            <div className="mt-2">
                                <span>Waiting for first result</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}
