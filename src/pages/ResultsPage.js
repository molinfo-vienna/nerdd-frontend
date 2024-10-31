import React, { useState } from "react"
import Markdown from "react-markdown"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import ColumnSelect from "../features/columnSelect/ColumnSelect"
import DeleteJobDialog from "../features/deleteJobDialog/DeleteJobDialog"
import Footer from "../features/footer/Footer"
import HeaderOneCard from "../features/header/HeaderOneCard"
import Pagination from "../features/pagination/Pagination"
import ResultTable from "../features/resultTable/ResultTable"
import {
    useGetJobStatusQuery,
    useGetModulesQuery,
    useGetResultsQuery,
} from "../services"
import LoadingPage from "./LoadingPage"

export default function ResultsPage() {
    const navigate = useNavigate()

    //
    // get parameters from url
    //

    // get the moduleName and jobId from the URL
    const { moduleName, jobId } = useParams()

    // get the (optional) page parameter from the URL (default to 1)
    const [searchParams, setSearchParams] = useSearchParams()
    const pageOneBased = parseInt(searchParams.get("page")) || 1

    if (pageOneBased <= 0) {
        navigate(`/${moduleName}/${jobId}`)
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
        data: modules,
        error: errorModules,
        isLoading: isLoadingModules,
    } = useGetModulesQuery()

    const {
        data: results,
        error: errorResults,
        isLoading: isLoadingResults,
    } = useGetResultsQuery({
        moduleName,
        jobId,
        page: pageOneBased,
    })

    const {
        data: jobStatus,
        error: errorJobStatus,
        isLoading: isLoadingJobStatus,
    } = useGetJobStatusQuery({ moduleName, jobId })

    // console.log("results", results, errorResults, isLoadingResults)
    // console.log("jobStatus", jobStatus, errorJobStatus, isLoadingJobStatus)

    if (errorModules) {
        return <div>Error fetching modules</div>
    }

    if (errorJobStatus) {
        return <div>Error fetching job status</div>
    }

    if (errorResults) {
        return <div>Error fetching results</div>
    }

    if (
        isLoadingModules ||
        isLoadingResults ||
        isLoadingJobStatus ||
        (modules !== undefined && Object.keys(modules).length === 0)
    ) {
        return LoadingPage()
    }

    const numEntriesTotal = jobStatus?.numEntriesTotal
    const pageSize = jobStatus?.pageSize ?? 1
    const numPagesTotal =
        numEntriesTotal !== undefined
            ? Math.ceil(numEntriesTotal / pageSize)
            : undefined

    // check if moduleName is a key in modules
    if (!(moduleName in modules)) {
        return <div>Module not found</div>
    }

    const module = modules[moduleName]

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

    const handleSelectionChange = (newColumnSelection) =>
        setColumnSelection(newColumnSelection)

    const progressAvailable =
        jobStatus?.numEntriesTotal !== undefined &&
        jobStatus?.numEntriesProcessed !== undefined

    const progress = progressAvailable
        ? jobStatus.numEntriesProcessed / jobStatus.numEntriesTotal
        : 1

    const progressPercent = Math.round(progress * 1000) / 10

    return (
        <>
            {/* <Header module={module}>
                <Header.Content>
                    <Markdown className="lead">{module.description}</Markdown>
                </Header.Content>
                <Header.Card href={`/${moduleName}/about`}>
                    <p className="mb-2">
                        <Icon name="FaBookOpen" size={35} className="me-2" />
                    </p>
                    <span>Documentation</span>
                </Header.Card>
                <Header.Card href={`/${moduleName}/api`}>
                    <p className="mb-2">
                        <Icon name="FaPlug" size={35} className="me-2" />
                    </p>
                    <span>Developer API</span>
                </Header.Card>
                <Header.Card href={`/${moduleName}/cite`}>
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
            <HeaderOneCard module={module} title="Job parameters">
                <HeaderOneCard.Content>
                    <Markdown className="lead">{module.description}</Markdown>
                    <h4>
                        {progressAvailable
                            ? `${progressPercent}%`
                            : "Estimating job size..."}
                    </h4>
                    <div className="progress">
                        <div
                            className={`progress-bar ${progressAvailable ? "" : "progress-bar-striped progress-bar-animated"}`}
                            role="progressbar"
                            style={{ width: `${progressPercent}%` }}
                            aria-valuenow={progressPercent}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </HeaderOneCard.Content>
                <HeaderOneCard.CardSection>
                    <p></p>
                </HeaderOneCard.CardSection>
                <HeaderOneCard.Icon
                    icon="FaBookOpen"
                    caption="Docs"
                    href={`/${moduleName}/about`}
                />
                <HeaderOneCard.Icon
                    icon="FaDownload"
                    caption="Download"
                    href={`/${moduleName}/api`}
                />
                <HeaderOneCard.Icon
                    icon="FaTrash"
                    caption="Delete"
                    className="border-danger text-danger"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteJobModal"
                    aria-expanded="false"
                />
            </HeaderOneCard>

            <DeleteJobDialog
                id="deleteJobModal"
                moduleName={moduleName}
                jobId={jobId}
            />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="d-flex justify-content-between">
                            <Pagination
                                moduleName={moduleName}
                                jobId={jobId}
                                currentPageOneBased={pageOneBased}
                                numEntriesTotal={numEntriesTotal}
                                pageSize={pageSize}
                                numPagesTotal={numPagesTotal}
                                className="mx-auto position-absolute start-50 translate-middle-x"
                            />
                            <ColumnSelect
                                columnSelection={columnSelection}
                                onSelectionChange={handleSelectionChange}
                                className="ms-auto"
                            />
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
                            {results?.data && results.data.length > 0 && (
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
                        {/* <Pagination
                            currentPageOneBased={pageOneBased}
                            numEntriesTotal={numEntriesTotal}
                            pageSize={pageSize}
                            numPagesTotal={numPagesTotal}
                        /> */}
                    </div>
                </div>
            </div>
            <Footer module={module} />
        </>
    )
}
