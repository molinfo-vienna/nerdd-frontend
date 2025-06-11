import Pagination from "@/features/pagination/Pagination"
import ColorSelectActionButton from "@/features/resultsHeader/ColorSelectActionButton"
import ColumnSelectActionButton from "@/features/resultsHeader/ColumnSelectActionButton"
import DeleteActionButton from "@/features/resultsHeader/DeleteActionButton"
import DocsActionButton from "@/features/resultsHeader/DocsActionButton"
import DownloadActionButton from "@/features/resultsHeader/DownloadActionButton"
import ResultsHeader from "@/features/resultsHeader/ResultsHeader"
import ResultTable from "@/features/resultTable/ResultTable"
import {
    useGetJobStatusQuery,
    useGetModuleQuery,
    useGetResultsQuery,
} from "@/services"
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import Layout from "./Layout"
import LoadingPage from "./LoadingPage"

export default function ResultsPage() {
    const navigate = useNavigate()

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
    } = useGetModuleQuery(moduleId)

    const {
        data: results,
        error: errorResults,
        isLoading: isLoadingResults,
        isFetching: isFetchingResults,
    } = useGetResultsQuery({
        moduleId,
        jobId,
        page: pageOneBased,
    })

    const {
        data: jobStatus,
        error: errorJobStatus,
        isLoading: isLoadingJobStatus,
    } = useGetJobStatusQuery({ moduleId, jobId })

    //
    // column selection state
    //
    const [columnSelection, setColumnSelection] = useState([])

    // initialize column selection
    useEffect(() => {
        if (module === undefined) {
            return
        }

        const initialColumnSelection = []

        module.resultProperties.forEach((resultProperty) => {
            const { name, visibleName, group, visible } = resultProperty

            const modifiedGroup = group || "General"
            const column = {
                name,
                label: visibleName,
                visible,
            }

            // is the group already in the array?
            const groupIndex = initialColumnSelection.findIndex(
                (e) => e.groupName === modifiedGroup,
            )
            if (groupIndex === -1) {
                // if not, add it
                initialColumnSelection.push({
                    groupName: modifiedGroup,
                    columns: [column],
                })
            } else {
                // if it is, add the column to the group
                initialColumnSelection[groupIndex].columns.push(column)
            }
        })

        setColumnSelection(initialColumnSelection)
    }, [module, setColumnSelection])

    const handleColumnSelectionChange = useCallback(
        (group, column, visible) => {
            const newColumnSelection = columnSelection.map((g) => {
                if (g.groupName === group) {
                    return {
                        ...g,
                        columns: g.columns.map((c) => {
                            if (c.name === column || column === null) {
                                return { ...c, visible }
                            }
                            return c
                        }),
                    }
                }
                return g
            })

            // if no column is selected, select at least "preprocessed_mol"
            const noColumnSelected = newColumnSelection.every((g) =>
                g.columns.every((c) => !c.visible),
            )
            const effectiveColumnSelection = noColumnSelected
                ? newColumnSelection.map((g) => {
                      if (g.groupName === "General") {
                          return {
                              ...g,
                              columns: g.columns.map((c) => {
                                  if (c.name === "preprocessed_mol") {
                                      return { ...c, visible: true }
                                  }
                                  return c
                              }),
                          }
                      } else {
                          return g
                      }
                  })
                : newColumnSelection

            setColumnSelection(effectiveColumnSelection)
        },
        [columnSelection, setColumnSelection],
    )

    //
    // color selection state
    //
    const [atomColorProperty, setAtomColorProperty] = useState(undefined)
    const [possibleAtomColorProperties, setPossibleAtomColorProperties] =
        useState([])

    // initialize color selection
    useEffect(() => {
        if (module === undefined) {
            return
        }

        const colorProperties = module.resultProperties.filter(
            (resultProperty) =>
                resultProperty.level === "atom" &&
                resultProperty.colorPalette != null,
        )
        setPossibleAtomColorProperties(colorProperties)
        if (colorProperties.length > 0) {
            // TODO: use palette specified in config
            setAtomColorProperty(colorProperties[0])
        } else {
            setAtomColorProperty(undefined)
        }
    }, [module, setAtomColorProperty, setPossibleAtomColorProperties])

    const handleAtomColorPropertyChange = useCallback(
        (newAtomColorProperty) => {
            setAtomColorProperty(newAtomColorProperty)
        },
        [setAtomColorProperty],
    )

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

    if (isLoadingModule || isLoadingJobStatus) {
        return LoadingPage()
    }

    //
    // status
    //
    const waitingForFirstResult =
        results?.data === undefined ||
        results.data.length === 0 ||
        isFetchingResults ||
        isLoadingResults

    return (
        <Layout>
            <Layout.Header>
                <ResultsHeader
                    module={module}
                    jobStatus={jobStatus}
                    columnSelection={columnSelection}
                    onColumnSelectionChange={handleColumnSelectionChange}
                >
                    <DocsActionButton moduleId={moduleId} />
                    <ColumnSelectActionButton
                        columnSelection={columnSelection}
                        onColumnSelectionChange={handleColumnSelectionChange}
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
                                    {!isLoadingResults &&
                                        results?.data &&
                                        results.data.length > 0 && (
                                            <div>
                                                <ResultTable
                                                    module={module}
                                                    pageOneBased={pageOneBased}
                                                    results={results.data}
                                                    columnSelection={
                                                        columnSelection
                                                    }
                                                    atomColorProperty={
                                                        atomColorProperty
                                                    }
                                                />
                                            </div>
                                        )}
                                </div>
                                {!isLoadingResults &&
                                    results.data.length > 1 && (
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
