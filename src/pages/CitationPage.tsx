import ModuleHeader from "@/features/moduleHeader/ModuleHeader"
import PublicationCard from "@/features/publicationCard/PublicationCard"
import { useModule } from "@/services"
import { useState } from "react"
import Layout from "./Layout"
import LoadingPage from "./LoadingPage"

export default function CitationPage() {
    const { module, isLoading } = useModule()

    const [selectedStyle, setSelectedStyle] = useState("apa")

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <Layout>
            <Layout.Header>
                <ModuleHeader
                    title="Cite"
                    description={""}
                    module={module}
                    subRoute="api"
                />
            </Layout.Header>
            {module != null && (
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col col-lg-8 col-xl-6">
                            <PublicationCard
                                publications={module.publications}
                                style={selectedStyle}
                                onSelectStyle={setSelectedStyle}
                            />
                        </div>
                        <div className="col-4 d-none d-lg-block ps-xl-5"></div>
                    </div>
                </div>
            )}
        </Layout>
    )
}
