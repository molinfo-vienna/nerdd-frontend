import { type Module } from "@/types"
import { Link } from "react-router-dom"
import "./style.scss"

type ModuleCardProps = {
    module: Module
}

export default function ModuleCard({ module }: ModuleCardProps) {
    return (
        <Link
            to={module.id}
            className="card module-card text-center h-100 pt-2 mb-3 mx-auto overflow-hidden text-decoration-none"
        >
            {/* border-0: remove separation line between card header and body */}
            <div className="card-header border-0 pt-4 pb-3">
                {/* object-fit-contain: image keeps aspect ratio */}
                <img
                    className="card-img-top object-fit-contain"
                    src={`/api/modules/${module.id}/logo`}
                    alt={module.visibleName}
                />
            </div>
            <div className="card-body pt-1">
                <h3 className="card-title">{module.visibleName}</h3>
                <p className="card-text fs-6 px-2">{module.logoCaption}</p>
            </div>
        </Link>
    )
}
