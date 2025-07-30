import { useModule, useModules } from "@/services/hooks"
import classNames from "classnames"
import Markdown from "react-markdown"
import { Link } from "react-router-dom"
import ImagePlaceholder from "../placeholder/ImagePlaceholder"
import LazyLoadImage from "../placeholder/LazyLoadImage"
import "./ApiHeader.css"

type ApiHeaderProps = {
    baseUrl: string
}

export default function ApiHeader({ baseUrl }: ApiHeaderProps) {
    const { modules, isLoading: isLoadingAllModules } = useModules()

    const { module } = useModule(false)

    const pseudoModule = {
        id: undefined,
        visibleName: "Overview",
        description: `All prediction modules can be used via our REST API. Select one of the 
        tools on the right to get a quickstart guide and an overview of all endpoints to run 
        predictions automatically. For more details, see the [full API documentation](${baseUrl}).`,
    }

    const activeModule =
        modules?.find((m) => m.id === module?.id) ?? pseudoModule

    return (
        <section className="container py-5">
            <div className="row justify-content-center pb-3">
                <div className="col col-lg-8 col-xl-6">
                    <h2 className="pb-3">
                        <span className="text-primary fw-bold">REST API: </span>
                        {activeModule.visibleName}
                    </h2>
                    <Markdown className="lead">
                        {activeModule.description}
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
                        {!isLoadingAllModules &&
                            modules.map((module, i) => (
                                <Link
                                    key={i}
                                    className={classNames(
                                        "api-button flex-fill d-flex flex-column text-decoration-none",
                                        "align-items-center py-2 px-3",
                                        {
                                            active:
                                                module.id === activeModule.id,
                                        },
                                    )}
                                    to={`/${module.id}/api`}
                                >
                                    <LazyLoadImage
                                        src={
                                            module.logo ??
                                            `/api/modules/${module.id}/logo`
                                        }
                                        alt={module.visibleName}
                                        className="card-img-top p-2"
                                    />
                                    <span>{module.visibleName}</span>
                                </Link>
                            ))}
                        {isLoadingAllModules &&
                            Array.from({ length: 8 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="api-button flex-fill d-flex flex-column text-decoration-none align-items-center py-2 px-3"
                                >
                                    <ImagePlaceholder className="card-img-top p-2" />
                                    <span className="placeholder-glow bg-light w-75">
                                        <span className="placeholder"></span>
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
