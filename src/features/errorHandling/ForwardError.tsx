import { NerddError, UnknownError } from "@/app/errors"
import ErrorPage from "@/pages/ErrorPage"
import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import RouteError from "./RouteError"

export default function ForwardError() {
    const routeError = useRouteError()

    let actualError = new UnknownError()
    if (isRouteErrorResponse(routeError)) {
        actualError = new RouteError(routeError)
    } else if (routeError instanceof NerddError) {
        actualError = routeError
    } else if (routeError instanceof Error) {
        actualError = new UnknownError(routeError)
    } else if (typeof routeError === "string") {
        actualError = new UnknownError(routeError)
    }

    return <ErrorPage error={actualError} />
}
