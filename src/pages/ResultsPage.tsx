import { useAppDispatch, useAppSelector } from "@/app/hooks"
import Pagination from "@/features/pagination/Pagination"
import ColorSelectActionButton from "@/features/resultsHeader/ColorSelectActionButton"
import ColumnSelectActionButton from "@/features/resultsHeader/ColumnSelectActionButton"
import DeleteActionButton from "@/features/resultsHeader/DeleteActionButton"
import DocsActionButton from "@/features/resultsHeader/DocsActionButton"
import DownloadActionButton from "@/features/resultsHeader/DownloadActionButton"
import ResultsHeader from "@/features/resultsHeader/ResultsHeader"
import ResultsProgress from "@/features/resultsProgress/ResultsProgress"
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
    setPropertyGroupIsColored,
    setResultProperties,
    setResultPropertyIsColored,
    setResultPropertyVisibility,
    setResults,
    setTask,
} from "@/features/resultTable/resultTableSlice"
import { useGetResultsQuery } from "@/services"
import { useJobStatus, useModule } from "@/services/hooks"
import { ResultProperty } from "@/types"
import { useCallback, useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
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
    const { module, isLoading: isLoadingModule } = useModule()
    const { job, isLoading: isLoadingJobStatus } = useJobStatus()

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
    // color column selection
    //
    const handleColorColumnToggle = useCallback(
        (propertyName: string, colored: boolean) => {
            dispatch(
                setResultPropertyIsColored({
                    propertyName,
                    colored,
                }),
            )
        },
        [dispatch],
    )

    const handleColorGroupToggle = useCallback(
        (groupName: string, colored: boolean) => {
            dispatch(setPropertyGroupIsColored({ groupName, colored }))
        },
        [dispatch],
    )

    //
    // error handling
    //
    if (errorResults) {
        // Status 202 means that the page might exist, but the server is still figuring out the
        // job size.
        if ("status" in errorResults && errorResults.status === 202) {
            // do nothing
        } else if (pageOneBased == 1) {
            throw errorResults
        } else {
            navigate(`/${moduleId}/${jobId}`)
        }
    }

    if (isLoadingModule || isLoadingJobStatus) {
        return <LoadingPage />
    }

    //
    // status
    //
    const waitingForFirstResult =
        resultsGroupedByMolId.length === 0 ||
        isFetchingResults ||
        isLoadingResults ||
        (errorResults &&
            "status" in errorResults &&
            errorResults.status === 202)

    return (
        <Layout>
            <Layout.Header>
                <ResultsHeader module={module} job={job}>
                    <DocsActionButton module={module} job={job} />
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
                        resultPropertyGroups={augmentedResultPropertyGroups}
                        onColorColumnToggle={handleColorColumnToggle}
                        onColorGroupToggle={handleColorGroupToggle}
                    />
                    <DownloadActionButton
                        job={job}
                        outputFormats={module.outputFormats}
                    />
                    <DeleteActionButton moduleId={moduleId} jobId={jobId} />
                </ResultsHeader>
            </Layout.Header>

            <div className="container-fluid py-4">
                {job.numEntriesProcessed > 0 && (
                    // This pagination is shown if there is at least one result *in total*
                    // (in contrast to the second pagination component below).
                    <div className="row justify-content-center">
                        <div className="col-auto my-3">
                            <Pagination
                                moduleId={moduleId}
                                jobId={jobId}
                                currentPageOneBased={pageOneBased}
                            />
                        </div>
                    </div>
                )}

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
                                            />
                                        </div>
                                    )}
                                </div>
                                {numberOfResults > 0 && (
                                    // This pagination is only shown if there is at least one
                                    // result *on this page*.
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
                    <ResultsProgress module={module} job={job} />
                )}
            </div>
        </Layout>
    )
}
