import AboutPage from "@/pages/AboutPage"
import CitationPage from "@/pages/CitationPage"
import CreateJobPage from "@/pages/CreateJobPage"
import DeveloperPage from "@/pages/DeveloperPage"
import ErrorPage from "@/pages/ErrorPage"
import LandingPage from "@/pages/LandingPage"
import LoadingPage from "@/pages/LoadingPage"
import ResultsPage from "@/pages/ResultsPage"
import { createBrowserRouter } from "react-router-dom"

export default function createRouter(children: React.ReactNode) {
    return createBrowserRouter([
        {
            path: "/",
            // TODO: use errorElement
            element: children,
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
                {
                    path: "*",
                    id: "not_found",
                    element: (
                        <ErrorPage
                            error={{
                                status: 404,
                                data: { detail: "Page not found." },
                            }}
                        />
                    ),
                },
            ],
        },
    ])
}
