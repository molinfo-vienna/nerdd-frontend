import Documentation from "@/features/apiCard/Documentation.mdx"
import TableOfContents from "@/features/tableOfContents/TableOfContents"
import { useModule } from "@/services/hooks"
import { useRef, useState } from "react"
import Layout from "./Layout"
import LoadingPage from "./LoadingPage"

export default function DeveloperPage() {
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
