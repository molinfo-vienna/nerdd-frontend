import classNames from "classnames"
import { sortedLastIndexBy } from "lodash"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { useGetJobStatusQuery } from "../../services"

function pageStatus(pageOneBased, pageSize, entriesProcessed) {
    const pageId = pageOneBased - 1
    const firstEntry = pageId * pageSize
    const lastEntry = firstEntry + pageSize - 1

    const index = Math.max(
        sortedLastIndexBy(
            entriesProcessed,
            [lastEntry, undefined],
            (x) => x[0],
        ) - 1,
        0,
    )

    if (index >= entriesProcessed.length) {
        return {
            isLoading: true,
            isEmpty: true,
        }
    }

    const [left, right] = entriesProcessed[index]

    const firstEntryInInterval = left <= firstEntry && firstEntry < right
    const lastEntryInInterval = left <= lastEntry && lastEntry < right

    if (lastEntryInInterval) {
        if (firstEntryInInterval) {
            // there is an interval [left, right] containing first and last entry of the page
            // --> page is fully processed
            return {
                isLoading: false,
                isEmpty: false,
            }
        } else {
            // the interval [left, right] contains only the last entry of the page
            // --> page is partially processed
            return {
                isLoading: true,
                isEmpty: false,
            }
        }
    } else {
        if (firstEntryInInterval) {
            // there is an interval [left, right] containing only the first entry of the page
            // --> page is partially processed
            return {
                isLoading: true,
                isEmpty: false,
            }
        } else {
            // there is no interval containing the first or last entry of the page
            // --> page is not processed
            return {
                isLoading: true,
                isEmpty: true,
            }
        }
    }
}

export default function Pagination({
    moduleId,
    jobId,
    currentPageOneBased,
    ...props
}) {
    //
    // get job status
    //
    const {
        data: jobStatus,
        error: errorJobStatus,
        isLoading: isLoadingJobStatus,
    } = useGetJobStatusQuery({ moduleId, jobId })

    if (isLoadingJobStatus || errorJobStatus) {
        return
    }

    const pageSize = jobStatus.pageSize
    const entriesProcessed = jobStatus.entriesProcessed
    const numPagesTotal = jobStatus.numPagesTotal

    //
    // figure out which pages to show
    //

    // define radius of pages to show around the current page
    // e.g. if radius is 2 and current page is 5, show pages 3, 4, 5, 6, 7
    const radius = 2

    // make sure that we always show 2 * radius + 1 pages (if enough pages exist)
    // e.g. if radius is 2 and current page is 1, show pages 1, 2, 3, 4, 5
    const start = Math.max(1, currentPageOneBased - radius)

    const pages = Array.from({ length: 2 * radius + 1 }).map(
        (_, i) => start + i,
    )

    // add first and last page
    const allPages = [1, ...pages, numPagesTotal].map((p) => ({
        id: p,
        ...pageStatus(p, pageSize, entriesProcessed),
        isActive: p === currentPageOneBased,
        ellipses: false,
    }))

    // filter invalid pages
    // note: numPagesProcessed might be equal numPagesTotal
    // --> we don't want to show a loading page if we processed all pages
    // --> check two conditions
    const validPages = allPages.filter(
        (p) =>
            p.id !== undefined &&
            p.id > 0 &&
            (numPagesTotal === undefined || p.id <= numPagesTotal),
    )

    // add "..." between pages
    const pagesWithEllipses = validPages.reduce((acc, p, i) => {
        if (acc.length === 0) {
            return [p]
        }

        const last = acc[acc.length - 1]

        if (p.id === last.id) {
            return acc
        }

        if (last.ellipses || p.id - last.id === 1) {
            return [...acc, p]
        } else {
            return [
                ...acc,
                {
                    id: `...${i}`,
                    isLoading: false,
                    ellipses: true,
                    isEmpty: true,
                },
                p,
            ]
        }
    }, [])

    const getPageLink = (page) => `?page=${page}`

    return (
        <nav aria-label="Page navigation" {...props}>
            <ul className="pagination">
                <li
                    className={classNames("page-item", {
                        disabled: currentPageOneBased == 1,
                    })}
                >
                    <Link
                        className="page-link"
                        to={getPageLink(currentPageOneBased - 1)}
                        aria-label="Previous"
                    >
                        <span aria-hidden="true">Previous</span>
                    </Link>
                </li>

                {pagesWithEllipses.map((p, i) => (
                    <li key={p.id} className="page-item">
                        <Link
                            className={classNames("page-link", {
                                disabled: p.ellipses,
                                "muted-link": p.ellipses || p.isEmpty,
                                active: p.isActive,
                            })}
                            to={getPageLink(p.id)}
                        >
                            {p.ellipses ? "..." : p.id}
                        </Link>
                    </li>
                ))}

                <li
                    className={classNames("page-item", {
                        disabled: currentPageOneBased == numPagesTotal,
                    })}
                >
                    <Link
                        className="page-link"
                        to={getPageLink(currentPageOneBased + 1)}
                        aria-label="Next"
                    >
                        <span aria-hidden="true">Next</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    moduleId: PropTypes.string.isRequired,
    jobId: PropTypes.string.isRequired,
    currentPageOneBased: PropTypes.number.isRequired,
}
