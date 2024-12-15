import React from "react"
import Markdown from "react-markdown"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "../features/footer/Footer"
import HeaderOneCard from "../features/header/HeaderOneCard"
import JobForm from "../features/jobForm/JobForm"
import { useAddJobMutation, useGetModuleQuery } from "../services"
import ErrorPage from "./ErrorPage"
import LoadingPage from "./LoadingPage"

export default function CreateJobPage() {
    const navigate = useNavigate()

    const { moduleId } = useParams()

    const { data: module, error, isLoading } = useGetModuleQuery(moduleId)

    const [addJob, {}] = useAddJobMutation()

    if (error) {
        return ErrorPage({ message: "Error fetching modules", error: error })
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

        addJob({ moduleId, data }).then((response) => {
            if (response.error) {
                console.error(response.error)
                return
            }

            navigate(`/${moduleId}/${response.data.id}`)
        })
    }

    // const authorList = module.publication.authors.map(
    //     (author) => `${author.firstName} ${author.lastName}`,
    // )
    // const authorText = authorList.join(", ")

    return (
        <>
            <HeaderOneCard module={module}>
                <HeaderOneCard.Content>
                    <Markdown className="lead">{module.description}</Markdown>
                </HeaderOneCard.Content>
                <HeaderOneCard.CardSection>
                    {/* <p className="fw-bold mb-2">
                        {module.publication.title}{" "}
                        <span className="fw-normal text-body-secondary">
                            ({module.publication.journal}{" "}
                            {module.publication.year})
                        </span>
                    </p>
                    <p className="mb-2">{authorText}</p> */}
                </HeaderOneCard.CardSection>
                <HeaderOneCard.Icon
                    icon="FaBookOpen"
                    caption="Docs"
                    href={`/${moduleId}/about`}
                />
                <HeaderOneCard.Icon
                    icon="FaPlug"
                    caption="API"
                    href={`/${moduleId}/api`}
                />
                <HeaderOneCard.Icon
                    icon="FaBook"
                    caption="Cite"
                    href={`/${moduleId}/cite`}
                />
                {/* <Header.Card>
                    <p className="mb-2">
                        <Icon name="FaClock" size={35} className="me-2" />
                    </p>
                    <span className="fs-6">
                        <TangleRuntime
                            moleculesPerSecond={2}
                            initialValue={100}
                        />
                    </span>
                </Header.Card> */}
            </HeaderOneCard>

            <main>
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-sm-6">
                            <h2 className="mb-5">Start prediction</h2>
                            <JobForm module={module} onSubmit={onSubmit} />
                        </div>
                        <div className="col-sm-4 d-sm-block d-none"></div>
                    </div>
                </div>
            </main>

            <Footer module={module} />
        </>
    )
}
