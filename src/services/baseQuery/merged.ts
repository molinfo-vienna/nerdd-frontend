import { CustomQueryFn } from "./custom"
import { fetchBaseQuery, type FetchArgs } from "./fetch"
import {
    uploadProgressBaseQuery,
    type UploadProgressArgs,
} from "./uploadProgress"

export type MergedBaseQueryArgs = {
    baseUrl?: string
}

export type MergedArgs = string | FetchArgs | UploadProgressArgs

export function mergedBaseQuery({
    baseUrl = "/",
}: MergedBaseQueryArgs = {}): CustomQueryFn<MergedArgs> {
    return async (args, api, extraOptions) => {
        // build options that are later passed to base query creator
        const options = {
            // override base url if necessary
            baseUrl: extraOptions?.baseUrlOverride || baseUrl,
        }

        // determine which base query to use based on presence of onUploadProgress callback
        if (
            typeof args !== "string" &&
            "onUploadProgress" in args &&
            typeof args.onUploadProgress === "function"
        ) {
            // return special base query for progress tracking
            return await uploadProgressBaseQuery(options)(
                args,
                api,
                extraOptions,
            )
        } else {
            // return regular base query for all other requests (no progress tracking)
            return await fetchBaseQuery(options)(args, api, extraOptions)
        }
    }
}
