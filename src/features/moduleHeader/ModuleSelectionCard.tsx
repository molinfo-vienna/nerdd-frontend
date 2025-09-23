import { Module } from "@/types"
import classNames from "classnames"
import { Link } from "react-router-dom"
import ImagePlaceholder from "../placeholder/ImagePlaceholder"
import LazyLoadImage from "../placeholder/LazyLoadImage"
import "./ModuleSelectionCard.css"

type ModuleSelectionCardProps = {
    activeModuleId?: string
    modules?: Module[]
    isLoadingAllModules: boolean
}

export default function ModuleSelectionCard({
    activeModuleId,
    modules,
    isLoadingAllModules,
}: ModuleSelectionCardProps) {
    return (
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
                                "api-button d-flex flex-column text-decoration-none",
                                "align-items-center py-2 px-3",
                                {
                                    active: module.id === activeModuleId,
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
    )
}
