export interface Result {
    id: string

    // these fields are not in camel case, because we leave result records as we get them from the
    // backend (which uses snake_case)
    job_id: string
    mol_id: number

    // other dynamic fields
    [key: string]: any
}

export default Result
