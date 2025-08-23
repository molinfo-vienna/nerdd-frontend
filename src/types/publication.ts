export interface Author {
    firstName: string
    lastName: string
}

export interface Publication {
    title?: string
    authors?: Author[]
    journal?: string
    year?: number
    doi?: string
    url?: string
}
