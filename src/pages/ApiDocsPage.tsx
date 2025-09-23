import Documentation from "@/features/apiDocs/ApiDocs.mdx"
import ModuleHeader from "@/features/moduleHeader/ModuleHeader"
import TableOfContents from "@/features/tableOfContents/TableOfContents"
import { useModule } from "@/services/hooks"
import { useRef, useState } from "react"
import Layout from "./Layout"
import LoadingPage from "./LoadingPage"

export default function ApiDocsPage() {
    // get the base url from the current location
    const baseUrl = `${window.location.protocol}//${window.location.host}/api`

    const { module, isLoading } = useModule(false)

    const ref = useRef(null)

    const [selectedLanguage, setSelectedLanguage] = useState("python")

    if (isLoading) {
        return <LoadingPage />
    }

    const description = `All prediction modules can be used via our REST API to run predictions 
        automatically. Select one of the tools to get a quickstart guide and an overview of all 
        endpoints. For more details, see the [full API documentation](${baseUrl}/docs).`

    return (
        <Layout>
            <Layout.Header>
                <ModuleHeader
                    title="REST API"
                    description={description}
                    module={module}
                />
            </Layout.Header>
            {module != null && (
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col col-lg-8 col-xl-6" ref={ref}>
                            <Documentation
                                baseUrl={baseUrl}
                                module={module}
                                selectedLanguage={selectedLanguage}
                                setSelectedLanguage={setSelectedLanguage}
                            />
                        </div>
                        <div className="col-4 d-none d-lg-block ps-xl-5">
                            <TableOfContents contentRef={ref} />
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    )
}
