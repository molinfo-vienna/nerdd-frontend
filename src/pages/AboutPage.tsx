import ModuleHeader from "@/features/moduleHeader/ModuleHeader"
import TableOfContents from "@/features/tableOfContents/TableOfContents"
import { useModule } from "@/services/hooks"
import { useRef } from "react"
import Markdown from "react-markdown"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import Layout from "./Layout"
import LoadingPage from "./LoadingPage"

export default function AboutPage() {
    const ref = useRef(null)

    const { module, isLoading } = useModule(false)

    if (isLoading) {
        return LoadingPage()
    }

    // apply bootstrap styling to specific markdown elements
    const components = {
        // tables: add bootstrap table class
        table(props) {
            return <table className="table table-striped" {...props} />
        },
    }

    const description = `The New E-Resource for Drug Discovery (NERDD) is a platform providing
    access to a variety of computational tools for drug discovery. Select a module on the right 
    to learn more about its features and capabilities.`

    return (
        <Layout>
            <Layout.Header>
                <ModuleHeader
                    title="Documentation"
                    description={description}
                    module={module}
                    subRoute="about"
                />
            </Layout.Header>

            <div className="container py-5">
                <div className="row justify-content-center">
                    {module?.about && (
                        <>
                            <div className="col col-lg-8 col-xl-6" ref={ref}>
                                <Markdown
                                    rehypePlugins={[rehypeSlug]}
                                    remarkPlugins={[remarkGfm]}
                                    components={components}
                                >
                                    {module.about}
                                </Markdown>
                            </div>
                            <div className="col-4 d-none d-lg-block ps-xl-5">
                                <TableOfContents contentRef={ref} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    )
}
