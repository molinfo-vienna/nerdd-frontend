export class NerddError extends Error {
    status: number
    statusText: string
    explanation?: string

    constructor(status: number, statusText: string, explanation?: string) {
        super(statusText)
        this.status = status
        this.statusText = statusText
        this.explanation = explanation
    }
}
