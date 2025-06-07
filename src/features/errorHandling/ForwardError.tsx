import { UnknownError } from "@/app/errors"
import ErrorPage from "@/pages/ErrorPage"
import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import RouteError from "./RouteError"

export default function ForwardError() {
    const routeError = useRouteError()

    let actualError = new UnknownError()
    if (isRouteErrorResponse(routeError)) {
        actualError = new RouteError(routeError)
    }

    return <ErrorPage error={actualError} />
}
