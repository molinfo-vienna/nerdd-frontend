import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import ModuleHeader from "../features/header/ModuleHeader"
import JobForm from "../features/jobForm/JobForm"
import { useAddJobMutation, useGetModuleQuery } from "../services"
import ErrorPage from "./ErrorPage"
import Layout from "./Layout"
import LoadingPage from "./LoadingPage"

export default function CreateJobPage() {
    const navigate = useNavigate()

    const { moduleId } = useParams()

    const [addJob, {}] = useAddJobMutation()

    const { data: module, error, isLoading } = useGetModuleQuery(moduleId)

    if (error) {
        return ErrorPage({
            error: error,
        })
    }

    if (isLoading) {
        return LoadingPage()
    }

    const onSubmit = async (values) => {
        // input
        let inputs = []
        let sources = []
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
        const jobParams = Object.fromEntries(
            module.jobParameters.map((param) => [
                param.name,
                values[param.name],
            ]),
        )

        // compose submit data
        const data = {
            job: {
                inputs,
                sources,
                ...jobParams,
            },
        }

        const response = await addJob({ moduleId, data })

        if (response.error) {
            console.error(response.error)
            return
        }

        navigate(`/${moduleId}/${response.data.id}`)
    }

    return (
        <Layout>
            <Layout.Header>
                <ModuleHeader module={module} />
            </Layout.Header>

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-sm-6">
                        <h2 className="mb-5">Start prediction</h2>
                        <JobForm module={module} onSubmit={onSubmit} />
                    </div>
                    <div className="col-sm-4 d-sm-block d-none"></div>
                </div>
            </div>
        </Layout>
    )
}
