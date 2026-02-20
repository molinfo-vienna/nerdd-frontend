import { BaseQueryFn, FetchBaseQueryError } from "@reduxjs/toolkit/query"

export type CustomExtraOptions = {
    baseUrlOverride?: string
}

export type CustomQueryFn<QueryArgs> = BaseQueryFn<
    QueryArgs,
    unknown,
    FetchBaseQueryError,
    CustomExtraOptions
>
