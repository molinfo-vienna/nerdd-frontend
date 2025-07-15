const statusMap: Record<number, string> = {
    0: "Unknown Error",
    400: "Bad Request",
    401: "Unauthorized",
    404: "Not Found",
    408: "Request Timeout",
    500: "Internal Server Error",
    503: "Service Unavailable",
}

export class NerddError extends Error {
    status: number
    statusText: string
    explanation?: string

    constructor(message: string, status: number, explanation?: string) {
        super(message)
        this.status = status
        this.statusText = statusMap[status]
        this.explanation = explanation
    }
}

export class UnknownError extends NerddError {
    constructor(error: Error | string | undefined = undefined) {
        let explanation
        if (typeof error === "string") {
            explanation = error
        } else if (error instanceof Error) {
            // Don't expose internal error messages to users
            explanation = undefined
        } else {
            explanation = "Please refresh the page or try again later."
        }

        super("Something went wrong", 0, explanation)
    }
}
