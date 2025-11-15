import CreateJobHeader from "@/features/createJobHeader/CreateJobHeader"
import JobForm, { type SubmitHandler } from "@/features/jobForm/JobForm"
import { useAddJobMutation } from "@/services"
import { useModule } from "@/services/hooks"
import { FORM_ERROR } from "final-form"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "./Layout"
import LoadingPage from "./LoadingPage"

export default function CreateJobPage() {
    const navigate = useNavigate()

    const [addJob] = useAddJobMutation()

    const { module, isLoading } = useModule()

    const onSubmit: SubmitHandler = useCallback(
        async (values) => {
            // for type safety, ensure module is defined
            if (module === undefined) {
                // (should never throw because the form won't render if module is undefined)
                throw new Error("Module is undefined")
            }

            // input
            let inputs: string[] = []
            let sources: string[] = []
            if (values.inputType === "text" && values.input !== undefined) {
                inputs = [values.input]
            } else if (
                values.inputType === "file" &&
                values.inputFile !== undefined
            ) {
                sources = values.inputFile.map(
                    (file) => file.sourceData?.id || "",
                )
            } else if (
                values.inputType === "draw" &&
                values.inputDrawn !== undefined
            ) {
                inputs = [values.inputDrawn]
            } else if (values.inputType === "example") {
                inputs = [module.exampleSmiles]
            } else {
                // this case should never be reached because of form validation
                // if it is reached, let the server return an error because of empty inputs
                inputs = []
            }

            // all other job parameters
            const params = Object.fromEntries(
                module.jobParameters.map((param) => [
                    param.name,
                    values[param.name],
                ]),
            )

            const response = await addJob({
                moduleId: module.id,
                inputs,
                sources,
                params,
            })

            if (response.error) {
                console.error(response.error)

                let errorMessage = "An error occurred while creating the job."
                let fieldErrors = {}
                const detail = response.error.data?.detail

                if (typeof detail === "string") {
                    // detail is the error message
                    errorMessage = detail
                } else if (Array.isArray(detail)) {
                    // detail is an array of error messages
                    for (const item of detail) {
                        if (item.loc?.[0] === "body" && item.loc?.[1]) {
                            // field-specific error
                            fieldErrors = {
                                ...fieldErrors,
                                [item.loc[1]]: item.msg,
                            }
                        } else {
                            // general error
                            errorMessage = item.msg
                        }
                    }
                }

                return {
                    [FORM_ERROR]: errorMessage,
                    ...fieldErrors,
                }
            }

            navigate(`/${module.id}/${response.data.id}`)
        },
        [addJob, module, navigate],
    )

    if (isLoading) {
        return LoadingPage()
    }

    // if isLoading is false, module has to be defined (otherwise useModule would throw an error)
    // -> this is just to satisfy TypeScript's type checker
    if (module === undefined) {
        return
    }

    return (
        <Layout>
            <Layout.Header>
                <CreateJobHeader module={module} />
            </Layout.Header>

            <div className="container py-5">
                <JobForm module={module} onSubmit={onSubmit} />
            </div>
        </Layout>
    )
}
