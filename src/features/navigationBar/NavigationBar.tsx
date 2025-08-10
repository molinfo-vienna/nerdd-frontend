import { useJobStatus, useModule } from "@/services/hooks"
import { Collapse } from "bootstrap"
import classNames from "classnames"
import { useCallback, useState } from "react"
import { FaBars, FaGithub } from "react-icons/fa6"
import { Link, useMatches } from "react-router-dom"

export default function NavigationBar() {
    // figure out which page we are on
    const matches = useMatches()
    const match = matches[matches.length - 1]
    const pageId = match?.id || "unknown"

    // get the module to receive the module name
    const { module } = useModule(false)
    const { job } = useJobStatus(false)

    // configure the breadcrumb elements based on the page
    let breadcrumbElements: Array<
        | {
              name: string
              url: string
              type?: "link"
          }
        | { type: "divider" }
    > = []
    let shortNavigation = false
    if (module != undefined) {
        if (pageId == "createJob") {
            breadcrumbElements = [
                { name: "Home", url: "/" },
                { name: module.visibleName, url: `/${module.id}` },
            ]
        } else if (pageId === "about") {
            breadcrumbElements = [
                { name: "Home", url: "/" },
                { name: module.visibleName, url: `/${module.id}` },
                { name: "About", url: `/${module.id}/about` },
            ]
        } else if (pageId === "cite") {
            breadcrumbElements = [
                { name: "Home", url: "/" },
                { name: module.visibleName, url: `/${module.id}` },
                { name: "Cite", url: `/${module.id}/cite` },
            ]
        } else if (pageId === "api") {
            breadcrumbElements = [
                { name: "Home", url: "/" },
                { name: module.visibleName, url: `/${module.id}` },
                { name: "API", url: `/${module.id}/api` },
            ]
        } else if (pageId === "results" && job != null) {
            breadcrumbElements = [
                { name: "Home", url: "/" },
                { name: module.visibleName, url: `/${module.id}` },
                { name: "Results", url: `/${module.id}/${job.id}` },
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

    // collapse the navbar on small screens
    const [collapse, setCollapse] = useState<Collapse | null>(null)

    const ref = useCallback(
        (node: HTMLDivElement | null) => {
            setCollapse((prev) => {
                if (prev) {
                    prev.dispose()
                }
                return null
            })

            if (node === null) {
                return
            }

            setCollapse(
                new Collapse(node, {
                    toggle: false,
                }),
            )
        },
        [setCollapse],
    )

    const handleClickMenuButton = useCallback(() => {
        if (collapse) {
            collapse.toggle()
        }
    }, [collapse])

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
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={handleClickMenuButton}
                    >
                        <FaBars />
                    </button>
                    <div
                        className="collapse navbar-collapse flex-grow-0"
                        ref={ref}
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
                                <Link to="/api-docs" className="nav-link">
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
