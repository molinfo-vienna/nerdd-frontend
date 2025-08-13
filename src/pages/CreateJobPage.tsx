import CreateJobHeader from "@/features/createJobHeader/CreateJobHeader"
import JobForm from "@/features/jobForm/JobForm"
import { useAddJobMutation } from "@/services"
import { useModule } from "@/services/hooks"
import { FORM_ERROR } from "final-form"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "./Layout"
import LoadingPage from "./LoadingPage"

export default function CreateJobPage() {
    const navigate = useNavigate()

    const [addJob, {}] = useAddJobMutation()

    const { module, isLoading } = useModule()

    const onSubmit = useCallback(
        async (values) => {
            // input
            let inputs: string[] = []
            let sources: string[] = []
            if (values.inputType === "text") {
                inputs = [values.input]
            } else if (values.inputType === "file") {
                sources = values.inputFile.map((file) => file.sourceData.id)
            } else if (values.inputType === "draw") {
                inputs = [values.inputDrawn]
            } else if (values.inputType === "example") {
                inputs = [module.exampleSmiles]
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
