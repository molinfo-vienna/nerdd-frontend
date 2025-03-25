import ModuleHeader from "@/features/header/ModuleHeader"
import TableOfContents from "@/features/tableOfContents/TableOfContents"
import { useGetModuleQuery } from "@/services"
import { useRef } from "react"
import Markdown from "react-markdown"
import { useParams } from "react-router-dom"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import ErrorPage from "./ErrorPage"
import Layout from "./Layout"
import LoadingPage from "./LoadingPage"

export default function AboutPage() {
    const ref = useRef()
    const { moduleId } = useParams()

    const { data: module, error, isLoading } = useGetModuleQuery(moduleId)

    if (isLoading) {
        return LoadingPage()
    }

    if (!module) {
        return ErrorPage({ error })
    }

    // apply bootstrap styling to specific markdown elements
    const components = {
        // tables: add bootstrap table class
        table(props) {
            return <table className="table table-striped" {...props} />
        },
    }

    return (
        <Layout>
            <Layout.Header>
                <ModuleHeader module={module} />
            </Layout.Header>
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
                    <div className="col-sm-6">
                        <div ref={ref}>
                            <Markdown
                                rehypePlugins={[rehypeSlug]}
                                remarkPlugins={[remarkGfm]}
                                components={components}
                            >
                                {module.about}
                            </Markdown>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <TableOfContents contentRef={ref} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
