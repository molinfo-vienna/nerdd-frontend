import ModuleHeader from "@/features/header/ModuleHeader"
import JobForm from "@/features/jobForm/JobForm"
import { useAddJobMutation } from "@/services"
import { useModule } from "@/services/hooks"
import { FORM_ERROR } from "final-form"
import { useNavigate } from "react-router-dom"
import Layout from "./Layout"
import LoadingPage from "./LoadingPage"

export default function CreateJobPage() {
    const navigate = useNavigate()

    const [addJob, {}] = useAddJobMutation()

    const { module, isLoading } = useModule()

    if (isLoading) {
        return LoadingPage()
    }

    const onSubmit = async (values) => {
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
            return {
                [FORM_ERROR]:
                    response.error.data?.detail ||
                    "An error occurred while creating the job.",
            }
        }

        navigate(`/${module.id}/${response.data.id}`)
    }

    return (
        <Layout>
            <Layout.Header>
                <ModuleHeader module={module} />
            </Layout.Header>

            <div className="container py-5">
                <JobForm module={module} onSubmit={onSubmit} />
            </div>
        </Layout>
    )
}
