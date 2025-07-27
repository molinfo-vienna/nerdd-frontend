import { type Module } from "@/types"
import classNames from "classnames"
import { useState } from "react"
import { Link } from "react-router-dom"
import ImagePlaceholder from "../placeholder/ImagePlaceholder"
import "./style.scss"

type ModuleCardProps = {
    module: Module
}

export default function ModuleCard({ module }: ModuleCardProps) {
    const src = module.logo ?? `/api/modules/${module.id}/logo`

    const [isLoading, setIsLoading] = useState(module.logo === undefined)

    return (
        <Link
            to={module.id}
            className="card module-card text-center h-100 pt-2 mb-3 mx-auto overflow-hidden text-decoration-none"
        >
            {/* border-0: remove separation line between card header and body */}
            <div className="card-header border-0 pt-4 pb-3">
                {isLoading && <ImagePlaceholder height={"8rem"} />}
                {/* object-fit-contain: image keeps aspect ratio */}
                <img
                    className={classNames("card-img-top object-fit-contain", {
                        "d-none": isLoading,
                    })}
                    src={src}
                    alt={module.visibleName}
                    onLoad={() => setIsLoading(false)}
                />
            </div>
            <div className="card-body pt-1">
                <h3 className="card-title">{module.visibleName}</h3>
                <p className="card-text fs-6 px-2">{module.logoCaption}</p>
            </div>
        </Link>
    )
}
