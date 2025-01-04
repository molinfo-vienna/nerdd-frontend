import React from "react"
import { useParams } from "react-router-dom"
import Footer from "../features/footer/Footer"
import ModuleHeader from "../features/header/ModuleHeader"
import { useGetModuleQuery } from "../services"
import ErrorPage from "./ErrorPage"
import LoadingPage from "./LoadingPage"

export default function DeveloperPage() {
    const { moduleId } = useParams()

    const { data: module, error, isLoading } = useGetModuleQuery(moduleId)

    if (error) {
        return ErrorPage({ message: "Error fetching modules", error: error })
    }

    if (isLoading) {
        return LoadingPage()
    }

    return (
        <>
            <ModuleHeader module={module} />
            {/* <Header module={module}>
                <Header.Content>
                    <Markdown className="lead">{module.description}</Markdown>
                </Header.Content>
                <Header.Card href={`/${moduleId}/about`}>
                    <p className="mb-2">
                        <Icon name="FaBookOpen" size={35} className="me-2" />
                    </p>
                    <span>Documentation</span>
                </Header.Card>
                <Header.Card href={`/${moduleId}/api`}>
                    <p className="mb-2">
                        <Icon name="FaPlug" size={35} className="me-2" />
                    </p>
                    <span>Developer API</span>
                </Header.Card>
                <Header.Card href={`/${moduleId}/cite`}>
                    <p className="mb-2">
                        <Icon name="FaBook" size={35} className="me-2" />
                    </p>
                    <span>How to cite</span>
                </Header.Card>
                <Header.Card>
                    <p className="mb-2">
                        <Icon name="FaClock" size={35} className="me-2" />
                    </p>
                    <span className="fs-6">
                        <TangleRuntime
                            moleculesPerSecond={2}
                            initialValue={100}
                        />
                    </span>
                </Header.Card>
            </Header> */}

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-sm-6"></div>
                    <div className="col-sm-4"></div>
                </div>
            </div>

            <Footer module={module} />
        </>
    )
}
