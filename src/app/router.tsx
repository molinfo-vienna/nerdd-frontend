import { lazy } from "react"
import { createBrowserRouter } from "react-router-dom"

import ForwardError from "@/features/errorHandling/ForwardError"
import LandingPage from "@/pages/LandingPage"
import LoadingPage from "@/pages/LoadingPage"

const ApiDocsPage = lazy(() => import("@/pages/ApiDocsPage"))
const CreateJobPage = lazy(() => import("@/pages/CreateJobPage"))
const AboutPage = lazy(() => import("@/pages/AboutPage"))
const ResultsPage = lazy(() => import("@/pages/ResultsPage"))
const ContactPage = lazy(() => import("@/pages/ContactPage"))

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
                    path: "/contact",
                    id: "contact",
                    element: <ContactPage />,
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
