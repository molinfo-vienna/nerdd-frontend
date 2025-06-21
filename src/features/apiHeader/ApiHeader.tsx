import { useModule, useModules } from "@/services/hooks"
import classNames from "classnames"
import Markdown from "react-markdown"
import { Link } from "react-router-dom"
import "./ApiHeader.css"

type ApiHeaderProps = {
    baseUrl: string
}

export default function ApiHeader({ baseUrl }: ApiHeaderProps) {
    const { modules, isLoading: isLoadingAllModules } = useModules()

    const { module, isLoading: isLoadingModule } = useModule()

    const description = `All prediction modules can be used via our REST API. Select one of the 
        tools on the right to get a quickstart guide and an overview of all endpoints to run 
        predictions automatically. For more details, see the [full API documentation](${baseUrl}).`

    const activeModule = modules?.find((m) => m.id === module?.id)

    return (
        <section className="container py-5">
            <div className="row justify-content-center pb-3">
                <div className="col col-lg-8 col-xl-6">
                    <h2 className="pb-3">
                        <span className="text-primary fw-bold">API: </span>
                        Documentation
                    </h2>
                    <Markdown className="lead">
                        {module != null ? module.description : description}
                    </Markdown>
                </div>
                {/* Info card as column on large screens */}
                <div
                    // d-none d-lg-block: show this column only on large screens
                    // ps-xl-5: add padding on the left side for very large screens
                    // align-content-center: center the content vertically
                    className="col-4 d-none d-lg-block ps-xl-5 align-content-center"
                >
                    <div className="api-header-card card d-flex flex-row flex-wrap justify-content-center overflow-hidden">
                        {modules?.map((module, i) => (
                            <Link
                                key={i}
                                className={classNames(
                                    "api-button flex-fill d-flex flex-column text-decoration-none",
                                    "align-items-center py-2 px-3",
                                    {
                                        active: module.id === activeModule?.id,
                                    },
                                )}
                                to={`/${module.id}/api`}
                            >
                                <img
                                    src={
                                        module.logo ??
                                        `/api/modules/${module.id}/logo`
                                    }
                                    className="card-img-top"
                                    alt="..."
                                />
                                {module.visibleName}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
