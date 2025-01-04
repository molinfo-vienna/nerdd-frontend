import React, { useState } from "react"
import { CircularProgressbar } from "react-circular-progressbar"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import ColumnSelectDropdown from "../features/columnSelect/ColumnSelectDropdown"
import DeleteJobDialog from "../features/deleteJobDialog/DeleteJobDialog"
import Footer from "../features/footer/Footer"
import Icon from "../features/icon/Icon"
import NavigationBar from "../features/navigationBar/NavigationBar"
import Pagination from "../features/pagination/Pagination"
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

    if (pageOneBased <= 0) {
        navigate(`/${moduleId}/${jobId}`)
    }

    //
    // column selection state
    //
    const [columnSelection, setColumnSelection] = useState(undefined)

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

    if (errorModule) {
        return ErrorPage({ message: "Error fetching module", error: {} })
    }

    if (errorJobStatus) {
        return ErrorPage({
            errorJobStatus,
        })
    }

    if (errorResults) {
        return ErrorPage({ message: "Error fetching results", error: {} })
    }

    if (isLoadingModule || isLoadingJobStatus) {
        return LoadingPage()
    }

    const numEntriesTotal = jobStatus.numEntriesTotal
    const pageSize = jobStatus.pageSize
    const numPagesTotal =
        numEntriesTotal != null
            ? Math.ceil(numEntriesTotal / pageSize)
            : undefined

    //
    // get columns
    //

    // if columnSelection is undefined, initialize it
    if (columnSelection === undefined && module.resultProperties) {
        let initialColumnSelection = []
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
        setColumnSelection(initialColumnSelection)
    }

    // const handleSelectionChange = (newColumnSelection) =>
    //     setColumnSelection(newColumnSelection)

    const handleSelectionChange = (group, column, visible) => {
        const newColumnSelection = columnSelection.map((g) => {
            if (g.groupName === group) {
                return {
                    ...g,
                    columns: g.columns.map((c) => {
                        if (c.name === column) {
                            return { ...c, visible }
                        }
                        return c
                    }),
                }
            }
            return g
        })

        setColumnSelection(newColumnSelection)
    }

    const progressAvailable =
        jobStatus?.numEntriesTotal != null &&
        jobStatus?.numEntriesProcessed != null

    const progress = progressAvailable
        ? jobStatus.numEntriesProcessed / jobStatus.numEntriesTotal
        : 1

    const progressPercent = Math.round(progress * 1000) / 10

    const outputFormats = ["sdf", "csv"]

    return (
        <>
            {/* <Header module={module}>
                <Header.Content>
                    <Markdown className="lead">{module.description}</Markdown>
                </Header.Content>
                <Header.Card href={`/${moduleId}/about`}>
                    <p className="mb-2">
                        <Icon name="FaBookOpen" size={35} className="me-2" />
                    </p>
                    <span>Documentation</span>
                </Header.Card>
                <Header.Card href={`/${moduleId}/api`}>
                    <p className="mb-2">
                        <Icon name="FaPlug" size={35} className="me-2" />
                    </p>
                    <span>Developer API</span>
                </Header.Card>
                <Header.Card href={`/${moduleId}/cite`}>
                    <p className="mb-2">
                        <Icon name="FaBook" size={35} className="me-2" />
                    </p>
                    <span>How to cite</span>
                </Header.Card>
                <Header.Card
                    className="border-danger text-danger"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteJobModal"
                    aria-expanded="false"
                >
                    <p className="mb-2">
                        <Icon name="FaTrash" size={35} className="me-2" />
                    </p>
                    <span>Delete</span>
                </Header.Card>
            </Header> */}
            {/* <HeaderOneCard module={module} title="Job parameters">
                <HeaderOneCard.Content>
                    <Markdown className="lead">{module.description}</Markdown>
                    <h4>
                        {progressAvailable
                            ? `${progressPercent}%`
                            : "Estimating job size..."}
                    </h4>
                </HeaderOneCard.Content>
                
                
            </HeaderOneCard> */}
            <header className="bg-body-tertiary">
                <NavigationBar />
                <section className="container py-4">
                    <div className="row justify-content-center pb-3">
                        <div className="col-sm-4">
                            <div className="d-flex">
                                <div
                                    className="mx-3"
                                    style={{ width: "90px", height: "90px" }}
                                >
                                    <CircularProgressbar
                                        value={
                                            progressAvailable
                                                ? progressPercent
                                                : 0
                                        }
                                        text={
                                            progressAvailable
                                                ? `${progressPercent}%`
                                                : ""
                                        }
                                        styles={{
                                            text: {
                                                fontWeight: "bold",
                                            },
                                        }}
                                    />
                                </div>
                                <div className="d-flex flex-column p-2">
                                    <div style={{ height: "50px" }}>
                                        <h1 className="text-primary fw-bold my-auto">
                                            {module.visibleName}
                                        </h1>
                                    </div>
                                    <div style={{ height: "20px" }}>
                                        <p className="mb-0">
                                            {progressAvailable
                                                ? `${jobStatus.numEntriesProcessed} / ${jobStatus.numEntriesTotal} molecules processed`
                                                : "Estimating job size..."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
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
                                                <Icon
                                                    name="FaBookOpen"
                                                    size={35}
                                                />
                                            </p>
                                        </div>
                                        <span className="text-primary">
                                            Docs
                                        </span>
                                    </div>
                                </Link>

                                {/* Columns */}
                                <div className="btn-group" role="group">
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
                                            <div style={{ height: "42px" }}>
                                                <p className="mb-0 text-primary">
                                                    <Icon
                                                        collection="hi2"
                                                        name="HiMiniViewColumns"
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
                                        columnSelection={columnSelection}
                                        handleSelectionChange={
                                            handleSelectionChange
                                        }
                                    />
                                </div>
                                {/* Download */}
                                <div className="btn-group" role="group">
                                    <Link
                                        className={`btn btn-outline-secondary text-center text-decoration-none text-reset d-block ${jobStatus.outputFiles.length == 0 ? "disabled" : ""}`}
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
                                            <div style={{ height: "42px" }}>
                                                <p className="mb-0 text-primary">
                                                    <Icon
                                                        collection="oldFa"
                                                        name="FaFileDownload"
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
                                        {outputFormats.map((format) => (
                                            <Link
                                                key={format}
                                                className={`dropdown-item ${jobStatus.outputFiles.find((f) => f.format == format) === undefined ? "disabled" : ""}`}
                                            >
                                                <Icon
                                                    name="FaFileLines"
                                                    size={24}
                                                    className="me-2"
                                                />
                                                {format.toUpperCase()}
                                            </Link>
                                        ))}
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
                                                <Icon
                                                    name="FaTrash"
                                                    size={33}
                                                />
                                            </p>
                                        </div>
                                        <span>Delete</span>
                                    </div>
                                </Link>
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

            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="d-flex justify-content-between">
                            <Pagination
                                moduleId={moduleId}
                                jobId={jobId}
                                currentPageOneBased={pageOneBased}
                                numEntriesTotal={numEntriesTotal}
                                pageSize={pageSize}
                                numPagesTotal={numPagesTotal}
                                className="mx-auto position-absolute start-50 translate-middle-x"
                            />
                            {/* <ColumnSelect
                                columnSelection={columnSelection}
                                onSelectionChange={handleSelectionChange}
                                className="ms-auto"
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-5">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        {/* <div
                            className="table-responsive"
                            // style={{
                            //     overflowX: "clip",
                            //     overflowY: "visible",
                            // }}
                        > */}
                        <div className="mx-auto">
                            <div className="clearfix"></div>
                            {!isLoadingResults &&
                                results?.data &&
                                results.data.length > 0 && (
                                    <div>
                                        <ResultTable
                                            module={module}
                                            results={results.data}
                                            columnSelection={columnSelection}
                                        />
                                    </div>
                                )}
                        </div>
                        {/* </div> */}
                        {!isLoadingResults && results.data.length > 1 && (
                            <Pagination
                                moduleId={moduleId}
                                jobId={jobId}
                                currentPageOneBased={pageOneBased}
                                numEntriesTotal={numEntriesTotal}
                                pageSize={pageSize}
                                numPagesTotal={numPagesTotal}
                                className="mx-auto position-absolute start-50 translate-middle-x"
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer module={module} />
        </>
    )
}
