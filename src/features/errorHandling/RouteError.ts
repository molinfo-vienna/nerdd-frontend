import { NerddError } from "@/app/errors"
import { ErrorResponse } from "react-router-dom"

export default class RouteError extends NerddError {
    constructor(errorResponse: ErrorResponse & { error?: Error }) {
        let explanation = undefined

        // If the error has a nested error object, use its message
        if (errorResponse.error && errorResponse.error.message) {
            explanation = errorResponse.error.message
        }

        super(
            "Cannot find the requested resource",
            errorResponse.status,
            explanation,
        )
    }
}
