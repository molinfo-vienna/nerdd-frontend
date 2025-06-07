const statusMap: Record<number, string> = {
    0: "Unknown Error",
    404: "Not Found",
    500: "Internal Server Error",
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
    constructor() {
        super(
            "An unknown error occurred",
            0,
            "Please refresh the page or try again later.",
        )
    }
}
