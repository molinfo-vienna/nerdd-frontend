import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { useGetResultsQuery } from "../../services"

export default function Pagination({
    moduleId,
    jobId,
    currentPageOneBased,
    numEntriesTotal,
    pageSize,
    numPagesTotal,
    ...props
}) {
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
        isLoading: true,
        isEmpty: true,
        isActive: p === currentPageOneBased,
        ellipses: false,
    }))

    // In React we can't have a different number of hook calls every time a component is
    // rendered. However, allPages *always& contains exactly 1 + (2 * radius + 1) + 1
    // = 2 * radius + 3 items.
    // -> We can call useGetResultsQuery for each page without running into problems.
    for (const page of allPages) {
        const skip =
            page.id == undefined ||
            page.id <= 0 ||
            (numPagesTotal !== undefined && page.id > numPagesTotal)

        const { data, error, isLoading } = useGetResultsQuery({
            moduleId,
            jobId,
            page: page.id,
            options: { skip },
        })

        if (!skip) {
            const pageObject = allPages.find((p) => p.id === page.id)
            pageObject.isLoading = isLoading || data?.isIncomplete || false
            pageObject.isEmpty =
                data?.data === undefined || data.data.length === 0
        }
    }

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
    const pagesWithEllipses = validPages.reduce((acc, p) => {
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
                { id: "...", isLoading: false, ellipses: true, isEmpty: true },
                p,
            ]
        }
    }, [])

    const getPageLink = (page) => `?page=${page}`

    return (
        <nav aria-label="Page navigation" {...props}>
            <ul className="pagination">
                <li
                    className={`page-item ${currentPageOneBased == 1 ? "disabled" : ""}`}
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
                    <Link
                        key={i}
                        className={`page-link ${p.ellipses || p.isEmpty ? "muted-link" : ""} ${p.isActive ? "active" : ""}`}
                        to={getPageLink(p.id)}
                    >
                        {p.id}
                    </Link>
                ))}

                <li
                    className={`page-item ${currentPageOneBased == numPagesTotal ? "disabled" : ""}`}
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
    numPagesTotal: PropTypes.number,
    numEntriesTotal: PropTypes.number,
    pageSize: PropTypes.number.isRequired,
}
