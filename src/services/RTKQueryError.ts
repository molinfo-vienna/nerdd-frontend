import { NerddError } from "@/app/errors"
import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

export default class RTKQueryError extends NerddError {
    constructor(error: FetchBaseQueryError | SerializedError) {
        let status = 0
        let message = "Unknown error"
        let explanation = undefined

        if ("status" in error) {
            // FetchBaseQueryError
            if (error.status === "PARSING_ERROR") {
                message = "Invalid server response"
                status = error.originalStatus ?? 0
            } else if (error.status === "FETCH_ERROR") {
                message = "Failed to fetch data from server"
                status = 503
            } else if (error.status === "TIMEOUT_ERROR") {
                message = "Request timed out"
                status = 408
            } else if (typeof error.status === "number") {
                message = error.data?.detail || "Unknown error"
                status = error.status
            }
        } else {
            // SerializedError
            status = 500
            message = "Something went wrong"
            explanation = error.message
        }

        super(message, status, explanation)
    }
}
