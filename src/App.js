import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import {
    Outlet,
    RouterProvider,
    createBrowserRouter,
    useLocation,
} from "react-router-dom"
import Debug from "./features/debug/Debug"
import AboutPage from "./pages/AboutPage"
import CitationPage from "./pages/CitationPage"
import CreateJobPage from "./pages/CreateJobPage"
import DeveloperPage from "./pages/DeveloperPage"
import LandingPage from "./pages/LandingPage"
import LoadingPage from "./pages/LoadingPage"
import ResultsPage from "./pages/ResultsPage"

function Root() {
    const { pathname, hash } = useLocation()

    // whenever the route changes, scroll to the top of the page
    useEffect(() => {
        // window.scrollTo(0, 0) does not work here, because the browser
        // scrolls to the top of the page before the new content is rendered
        // -> use setTimeout to scroll after the new content is rendered
        if (hash === "") {
            setTimeout(() => window.scrollTo(0, 0), 0)
        }
    }, [pathname])

    // this is a hack to force a re-render of all components
    // whenever the key changes, all components are re-rendered
    const key = useSelector((state) => state.debug.key)

    return (
        <>
            <Debug />
            <Outlet key={key} />
        </>
    )
}

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: "/",
                    id: "landing",
                    element: <LandingPage />,
                },
                {
                    path: "/developer",
                    id: "api_general",
                    element: <DeveloperPage />,
                },
                {
                    path: "/cite",
                    id: "cite_general",
                    element: <CitationPage />,
                },
                {
                    path: "/contact",
                    id: "contact",
                    element: <DeveloperPage />,
                },
                {
                    path: "/:moduleId",
                    id: "createJob",
                    element: <CreateJobPage />,
                },
                {
                    path: "/:moduleId/about",
                    id: "about",
                    element: <AboutPage />,
                },
                {
                    path: "/:moduleId/api",
                    id: "api",
                    element: <DeveloperPage />,
                },
                {
                    path: "/:moduleId/cite",
                    id: "cite",
                    element: <CitationPage />,
                },
                {
                    // put this route at the bottom to avoid conflicts with other routes
                    path: "/:moduleId/:jobId",
                    id: "results",
                    element: <ResultsPage />,
                },
                {
                    // this route only exists for debugging purposes
                    // (no link should point to this page)
                    path: "/loading",
                    id: "loading",
                    element: <LoadingPage />,
                },
            ],
        },
    ])

    return <RouterProvider router={router} />
}
