import Documentation from "@/features/apiCard/Documentation.mdx"
import TableOfContents from "@/features/tableOfContents/TableOfContents"
import { useGetModuleQuery } from "@/services"
import { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import Layout from "./Layout"
import LoadingPage from "./LoadingPage"

export default function DeveloperPage() {
    // get the base url from the current location
    const baseUrl = `${window.location.protocol}//${window.location.host}/api`

    const { moduleId } = useParams<{ moduleId: string }>()

    const ref = useRef(null)

    const {
        data: module,
        isLoading,
        isError,
    } = useGetModuleQuery(moduleId || "", { skip: !moduleId })

    const [selectedLanguage, setSelectedLanguage] = useState("python")

    if (isLoading) {
        return LoadingPage()
    }

    if (isError || !module) {
        return LoadingPage()
    }

    return (
        <Layout>
            <Layout.Header>
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-7">
                            <h1>{module.visibleName}: Developer API</h1>
                        </div>
                    </div>
                </div>
            </Layout.Header>
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col col-lg-7 offset-lg-2" ref={ref}>
                        <Documentation
                            baseUrl={baseUrl}
                            module={module}
                            selectedLanguage={selectedLanguage}
                            setSelectedLanguage={setSelectedLanguage}
                        />
                    </div>
                    <div className="col-lg-2 d-none d-lg-block">
                        <TableOfContents contentRef={ref} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
