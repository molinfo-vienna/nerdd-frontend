import React, { useCallback, useEffect, useState } from "react"
import { FaFileDownload } from "react-icons/fa"
import { FaBookOpen, FaFileLines, FaTrash } from "react-icons/fa6"
import { HiMiniViewColumns } from "react-icons/hi2"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import ColumnSelectDropdown from "../features/columnSelect/ColumnSelectDropdown"
import DeleteJobDialog from "../features/deleteJobDialog/DeleteJobDialog"
import Footer from "../features/footer/Footer"
import NavigationBar from "../features/navigationBar/NavigationBar"
import Pagination from "../features/pagination/Pagination"
import ProgressBar from "../features/progressBar/ProgressBar"
import ResultTable from "../features/resultTable/ResultTable"
import {
    useGetJobStatusQuery,
    useGetModuleQuery,
    useGetResultsQuery,
} from "../services"
import ErrorPage from "./ErrorPage"
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
    }, [pageOneBased, navigate])

    //
    // always scroll to top when page changes
    //
    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [page])

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
        let initialColumnSelection = []
        if (module?.resultProperties !== undefined) {
            module.resultProperties.forEach((resultProperty) => {
                const { name, visibleName, group, visible } = resultProperty

                const modifiedGroup = group || "General"
                const column = {
                    name,
                    label: visibleName,
                    visible,
                }

                // is the group already in the array?
                let groupIndex = initialColumnSelection.findIndex(
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
        }
        setColumnSelection(initialColumnSelection)
    }, [module, setColumnSelection])

    const handleSelectionChange = useCallback(
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

            setColumnSelection(newColumnSelection)
        },
        [columnSelection, setColumnSelection],
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

    const statusText = `${jobStatus.numEntriesProcessed ?? 0} / ${jobStatus.numEntriesTotal ?? "?"} molecules processed`

    const outputFormats = ["sdf", "csv"]

    const outputFileItems = outputFormats.map((format) => {
        const fileFromStatus = (jobStatus.outputFiles ?? []).find(
            (f) => f.format == format,
        )
        const status = fileFromStatus === undefined ? "disabled" : ""
        return {
            format,
            status,
            url: fileFromStatus?.url ?? "",
        }
    })

    return (
        <>
            <main className="min-vh-100">
                <header className="bg-body-tertiary">
                    <NavigationBar />
                    <section className="container py-4">
                        <div className="row justify-content-center pb-3">
                            <div className="col">
                                {/*
                                 * We use a flexbox with justify-content-center to center the
                                 * progress bar, the module name and the action buttons.
                                 */}
                                <div className="d-flex justify-content-center">
                                    {/* Progress bar */}
                                    <ProgressBar
                                        numEntriesProcessed={
                                            jobStatus.numEntriesProcessed
                                        }
                                        numEntriesTotal={
                                            jobStatus.numEntriesTotal
                                        }
                                    />
                                    {/* Module name & status*/}
                                    <div className="d-flex flex-column p-2 me-5">
                                        <div style={{ height: "50px" }}>
                                            <h1 className="text-primary fw-bold my-auto">
                                                {module.visibleName}
                                            </h1>
                                        </div>
                                        <div style={{ height: "20px" }}>
                                            <p className="mb-0">{statusText}</p>
                                        </div>
                                    </div>
                                    {/* Action buttons */}
                                    <div className="btn-group" role="group">
                                        {/* Docs */}
                                        <Link
                                            className="btn btn-outline-secondary text-center text-decoration-none text-reset d-block"
                                            to={`/${moduleId}/about`}
                                            type="button"
                                        >
                                            <div
                                                className="d-flex flex-column p-2"
                                                style={{
                                                    width: "90px",
                                                }}
                                            >
                                                <div style={{ height: "42px" }}>
                                                    <p className="mb-0 text-primary">
                                                        <FaBookOpen size={35} />
                                                    </p>
                                                </div>
                                                <span className="text-primary">
                                                    Docs
                                                </span>
                                            </div>
                                        </Link>

                                        {/* Columns */}
                                        <div
                                            className="btn-group dropdown-center"
                                            role="group"
                                        >
                                            <Link
                                                className="btn btn-outline-secondary text-center text-decoration-none text-reset d-block"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                data-bs-auto-close="outside"
                                                aria-expanded="false"
                                            >
                                                <div
                                                    className="d-flex flex-column p-2"
                                                    style={{
                                                        width: "90px",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: "42px",
                                                        }}
                                                    >
                                                        <p className="mb-0 text-primary">
                                                            <HiMiniViewColumns
                                                                size={36}
                                                            />
                                                        </p>
                                                    </div>
                                                    <span className="text-primary">
                                                        Columns
                                                    </span>
                                                </div>
                                            </Link>
                                            <ColumnSelectDropdown
                                                columnSelection={
                                                    columnSelection
                                                }
                                                handleSelectionChange={
                                                    handleSelectionChange
                                                }
                                            />
                                        </div>
                                        {/* Download */}
                                        <div className="btn-group" role="group">
                                            <Link
                                                className={`btn btn-outline-secondary text-center text-decoration-none text-reset d-block ${jobStatus.outputFiles !== undefined && jobStatus.outputFiles.length == 0 ? "disabled" : ""}`}
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                data-bs-auto-close="outside"
                                            >
                                                <div
                                                    className="d-flex flex-column p-2"
                                                    style={{
                                                        width: "90px",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: "42px",
                                                        }}
                                                    >
                                                        <p className="mb-0 text-primary">
                                                            <FaFileDownload
                                                                size={33}
                                                            />
                                                        </p>
                                                    </div>
                                                    <span className="text-primary">
                                                        Download
                                                    </span>
                                                </div>
                                            </Link>
                                            <div className="dropdown-menu dropdown-menu-end p-2">
                                                {outputFileItems.map(
                                                    (item, index) => (
                                                        <Link
                                                            key={index}
                                                            className={`dropdown-item ${item.status}`}
                                                            to={`${item.url}`}
                                                            target="_blank"
                                                            download
                                                        >
                                                            <FaFileLines
                                                                size={24}
                                                                className="me-2"
                                                            />
                                                            {item.format.toUpperCase()}
                                                        </Link>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                        {/* Delete */}
                                        <Link
                                            className="btn btn-outline-danger text-center text-decoration-none text-reset d-block"
                                            to="#"
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteJobModal"
                                            aria-expanded="false"
                                        >
                                            <div
                                                className="d-flex flex-column p-2"
                                                style={{
                                                    width: "90px",
                                                }}
                                            >
                                                <div style={{ height: "42px" }}>
                                                    <p className="mb-0">
                                                        <FaTrash size={33} />
                                                    </p>
                                                </div>
                                                <span>Delete</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </header>

                <DeleteJobDialog
                    id="deleteJobModal"
                    moduleId={moduleId}
                    jobId={jobId}
                />

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
                                                        pageOneBased={
                                                            pageOneBased
                                                        }
                                                        results={results.data}
                                                        columnSelection={
                                                            columnSelection
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
                                                currentPageOneBased={
                                                    pageOneBased
                                                }
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
                                <div
                                    className="spinner-border"
                                    role="status"
                                ></div>
                                <div className="mt-2">
                                    <span>Waiting for first result</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer module={module} />
        </>
    )
}
