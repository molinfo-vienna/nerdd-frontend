import classNames from "classnames"
import { FaBars, FaGithub } from "react-icons/fa6"
import { Link, useMatches, useParams } from "react-router-dom"
import { useGetModuleQuery } from "../../services"

export default function NavigationBar() {
    // figure out which page we are on
    const matches = useMatches()
    const match = matches[matches.length - 1]
    const pageId = match?.id || "unknown"

    // get the params from the url (we might need them)
    const { moduleId, jobId } = useParams()

    // get the module list to receive the module name
    const { data: module } = useGetModuleQuery(moduleId, {
        skip: moduleId === undefined,
    })

    // configure the breadcrumb elements based on the page
    let breadcrumbElements
    let shortNavigation = false
    if (moduleId !== undefined && module !== undefined) {
        if (pageId == "createJob") {
            breadcrumbElements = [
                { name: "Home", url: "/" },
                { name: module.visibleName, url: `/${moduleId}` },
            ]
        } else if (pageId === "about") {
            breadcrumbElements = [
                { name: "Home", url: "/" },
                { name: module.visibleName, url: `/${moduleId}` },
                { name: "About", url: `/${moduleId}/about` },
            ]
        } else if (pageId === "cite") {
            breadcrumbElements = [
                { name: "Home", url: "/" },
                { name: module.visibleName, url: `/${moduleId}` },
                { name: "Cite", url: `/${moduleId}/cite` },
            ]
        } else if (pageId === "api") {
            breadcrumbElements = [
                { name: "Home", url: "/" },
                { name: module.visibleName, url: `/${moduleId}` },
                { name: "API", url: `/${moduleId}/api` },
            ]
        } else if (pageId === "results") {
            breadcrumbElements = [
                { name: "Home", url: "/" },
                { name: module.visibleName, url: `/${moduleId}` },
                { name: "Results", url: `/${moduleId}/${jobId}` },
            ]
        } else {
            // unknown page
            breadcrumbElements = []
            shortNavigation = true
        }
    } else {
        if (pageId === "landing") {
            breadcrumbElements = []
            shortNavigation = true
        } else {
            // unknown page
            breadcrumbElements = []
            shortNavigation = true
        }
    }

    // interlace the breadcrumb elements with slashes in a funcational style
    const divider = { type: "divider" }
    breadcrumbElements = breadcrumbElements
        .flatMap((value) => [{ ...value, type: "link" }, divider])
        .slice(0, -1)

    return (
        // navbar on landing page is very short
        // (~350px < 375px = typical iPhone screen width)
        // -> navbar-expand-sm shows the full navbar even on smaller screens
        // -> navbar-expand-md shows the full navbar on larger screens only
        <header
            className={classNames(
                `navbar ${shortNavigation ? "navbar-expand-sm" : "navbar-expand-md"}`,
            )}
        >
            {/*
              * The following div is used to center the navbar.
              * justify-content-sm-center: center the navbar on larger screens 
                    (sm = exceeding small screen size)
              * justify-content-between: space out the navbar items otherwise (on
                    small screens)
            */}
            <div className="container-fluid justify-content-sm-center justify-content-between">
                {/*
                 * The following div is used to draw a vertical line below the navbar.
                 * d-flex flex-wrap justify-content-between: compatibility with the
                 *     wrapping navbar
                 * flex-grow-1 flex-sm-grow-0: on small screens, the navbar should
                 *     grow to fill the space, but not on larger screens
                 * border-sm-bottom: underline navbar only on larger screens
                 * px-3: make the line slightly wider than the navbar
                 */}
                <div
                    className={classNames(
                        "d-flex flex-wrap justify-content-between flex-grow-1 px-3",
                        {
                            "flex-sm-grow-0": shortNavigation,
                            "flex-md-grow-0": !shortNavigation,
                            "border-sm-bottom": shortNavigation,
                            "border-md-bottom": !shortNavigation,
                        },
                    )}
                >
                    <Link className="navbar-brand" to="/">
                        NERDD
                    </Link>
                    <button
                        className="navbar-toggler border-0"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <FaBars />
                    </button>
                    <div
                        className="collapse navbar-collapse flex-grow-0"
                        id="navbarNavDropdown"
                    >
                        {/*
                         * align-items-*-center: vertically align navbar entries
                         */}

                        <ul
                            className={classNames("navbar-nav", {
                                "align-items-sm-center": shortNavigation,
                                "align-items-md-center": !shortNavigation,
                            })}
                        >
                            {/* breadcrumb elements */}
                            {breadcrumbElements.map((element, i) =>
                                element.type === "link" ? (
                                    <li key={i} className="nav-item">
                                        <Link
                                            to={element.url}
                                            className="nav-link"
                                        >
                                            {element.name}
                                        </Link>
                                    </li>
                                ) : (
                                    // note: the dividers are hidden when the navbar is
                                    // collapsed (due to the d-none class)
                                    <li
                                        key={i}
                                        className={classNames(
                                            "nav-item d-none",
                                            {
                                                "d-sm-block": shortNavigation,
                                                "d-md-block": !shortNavigation,
                                            },
                                        )}
                                    >
                                        <span className="nav-link px-0">/</span>
                                    </li>
                                ),
                            )}
                            {/* additional navbar items */}
                            <li
                                className={classNames(`nav-item`, {
                                    "ps-md-3": breadcrumbElements.length > 0,
                                })}
                            >
                                <Link
                                    to="https://comp3d.univie.ac.at/the-comp3d-team/"
                                    className="nav-link"
                                    target="_blank"
                                >
                                    About us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/developer" className="nav-link">
                                    API
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">
                                    Contact
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="https://github.com/molinfo-vienna/nerdd-module"
                                    className="nav-link"
                                    target="_blank"
                                >
                                    <FaGithub size={25} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
