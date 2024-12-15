import React from "react"
import { Link } from "react-router-dom"
import { moduleType } from "../../types"
import "./style.scss"

export default function ModuleCard({ module }) {
    return (
        <Link
            to={module.name}
            className="card module-card text-center h-100 mb-3 mx-auto overflow-hidden text-decoration-none"
        >
            {/* border-0: remove separation line between card header and body */}
            <div className="card-header border-0 pt-4 pb-3">
                {/* object-fit-contain: image keeps aspect ratio */}
                <img
                    className="card-img-top object-fit-contain"
                    src={module.logo}
                    alt={module.visibleName}
                />
            </div>
            <div className="card-body pt-1">
                <h3 className="card-title fw-bold">{module.visibleName}</h3>
                <p className="card-text fs-6">{module.logoCaption}</p>
            </div>
        </Link>
    )
}

ModuleCard.propTypes = {
    module: moduleType.isRequired,
}
