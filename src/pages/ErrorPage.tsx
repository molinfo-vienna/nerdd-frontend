import classNames from "classnames"
import { BsExclamationCircle } from "react-icons/bs"
import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import Layout from "./Layout"

const statusMap = {
    404: "Not Found",
    500: "Internal Server Error",
}

type ErrorPageProps = {
    error?: Error | string
    explanation?: string
    resetErrorBoundary?: () => void
}

export default function ErrorPage({
    error,
    resetErrorBoundary,
    explanation,
}: ErrorPageProps) {
    let status = 0
    let statusExplanation = "Unknown Error"
    let message = "Something went wrong."

    //
    // check if this is a routing error
    //
    const routeError = useRouteError()
    if (routeError) {
        // leave this console.error call here for reporting errors
        console.error(routeError)

        if (isRouteErrorResponse(routeError)) {
            status = routeError.status
            statusExplanation = routeError.statusText

            if (routeError.error) {
                message = routeError.error.message
            }
        }
    } else {
        // leave this console.error call here for reporting errors
        console.error(error)

        if (error.status === "PARSING_ERROR") {
            status = error.originalStatus ?? 0
        } else {
            status = error.status
        }
        message = error?.data?.detail || "An unknown error occurred"

        statusExplanation = statusMap[status] || "Unknown Error"
    }

    // pad the status code to 3 digits, e.g. 20 -> 020
    const statusString = status.toString().padStart(3, "0")

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-auto mt-5 pt-5">
                        <div
                            // align-items-center: the error message is centered with respect
                            //   to the icon (if there is no explanation text provided, there is
                            //   not enough text and it looks weird).
                            className={classNames(
                                `d-flex flex-row align-items-center`,
                                {
                                    "align-items-center":
                                        explanation === undefined,
                                },
                            )}
                        >
                            <div className="px-4">
                                <p className="mb-0">
                                    <BsExclamationCircle size={120} />
                                </p>
                            </div>
                            <div>
                                <p className="text-danger fw-bold mb-0">
                                    {statusString}: {statusExplanation}
                                </p>
                                <h1>{message}</h1>
                                {explanation && <p>{explanation}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
