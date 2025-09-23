import { lazy } from "react"
import { createBrowserRouter } from "react-router-dom"

import ForwardError from "@/features/errorHandling/ForwardError"
import LoadingPage from "@/pages/LoadingPage"

const LandingPage = lazy(() => import("@/pages/LandingPage"))
const ApiDocsPage = lazy(() => import("@/pages/ApiDocsPage"))
const CitationPage = lazy(() => import("@/pages/CitationPage"))
const CreateJobPage = lazy(() => import("@/pages/CreateJobPage"))
const AboutPage = lazy(() => import("@/pages/AboutPage"))
const ResultsPage = lazy(() => import("@/pages/ResultsPage"))
const ConstructionPage = lazy(() => import("@/pages/ConstructionPage"))

export default function createRouter(children: React.ReactNode) {
    return createBrowserRouter([
        {
            path: "/",
            element: children,
            errorElement: <ForwardError />,
            children: [
                {
                    path: "/",
                    id: "landing",
                    element: <LandingPage />,
                },
                {
                    path: "/about",
                    id: "aboutGeneral",
                    element: <AboutPage />,
                },
                {
                    path: "/api-docs",
                    id: "apiDocsGeneral",
                    element: <ApiDocsPage />,
                },
                {
                    path: "/cite",
                    id: "citeGeneral",
                    element: <CitationPage />,
                },
                {
                    path: "/contact",
                    id: "contact",
                    element: <ConstructionPage />,
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
                    id: "apiDocs",
                    element: <ApiDocsPage />,
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
}
