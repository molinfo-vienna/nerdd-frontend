import Documentation from "@/features/apiDocs/ApiDocs.mdx"
import ModuleHeader from "@/features/header/ModuleHeader"
import TableOfContents from "@/features/tableOfContents/TableOfContents"
import { useModule } from "@/services/hooks"
import { useRef, useState } from "react"
import Layout from "./Layout"
import LoadingPage from "./LoadingPage"

export default function ApiDocsPage() {
    // get the base url from the current location
    const baseUrl = `${window.location.protocol}//${window.location.host}/api`

    const { module, isLoading } = useModule()

    const ref = useRef(null)

    const [selectedLanguage, setSelectedLanguage] = useState("python")

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <Layout>
            <Layout.Header>
                <ModuleHeader module={module} />
            </Layout.Header>
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
        </Layout>
    )
}
