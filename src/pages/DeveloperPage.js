import React from "react"
import Markdown from "react-markdown"
import { useParams } from "react-router-dom"
import Footer from "../features/footer/Footer"
import Header from "../features/header/Header"
import Icon from "../features/icon/Icon"
import TangleRuntime from "../features/tangleRuntime/TangleRuntime"
import { useGetModulesQuery } from "../services"
import LoadingPage from "./LoadingPage"

export default function DeveloperPage() {
    const { moduleName } = useParams()

    const { data: modules, error, isLoading } = useGetModulesQuery()

    if (isLoading) {
        return LoadingPage()
    }

    const module = modules[moduleName]

    if (!module) {
        return <div>Module not found</div>
    }

    return (
        <>
            <Header module={module}>
                <Header.Content>
                    <Markdown className="lead">{module.description}</Markdown>
                </Header.Content>
                <Header.Card href={`/${moduleName}/about`}>
                    <p className="mb-2">
                        <Icon name="FaBookOpen" size={35} className="me-2" />
                    </p>
                    <span>Documentation</span>
                </Header.Card>
                <Header.Card href={`/${moduleName}/api`}>
                    <p className="mb-2">
                        <Icon name="FaPlug" size={35} className="me-2" />
                    </p>
                    <span>Developer API</span>
                </Header.Card>
                <Header.Card href={`/${moduleName}/cite`}>
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
            </Header>

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
