import { snakeToCamelCase } from "@/services/recursiveSnakeToCamelCase"
import { Job, JobParameter, Module } from "@/types"
import { memo } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
import { FaRectangleList } from "react-icons/fa6"
import ActionButton from "./ActionButton"

type DocsActionButtonProps = {
    module: Module
    job: Job
}

function convertParamValueToString(
    value: any,
    jobParameter: JobParameter,
): string {
    if (value == null) {
        return "-"
    } else if (jobParameter.choices != null) {
        const choice = jobParameter.choices.find((c) => c.value === value)
        return choice ? choice.label : String(value)
    } else if (
        jobParameter.type === "boolean" ||
        jobParameter.type === "bool"
    ) {
        return value ? "yes" : "no"
    } else {
        return String(value)
    }
}

function DocsActionButton({ module, job }: DocsActionButtonProps) {
    return (
        <div className="btn-group dropdown-center" role="group">
            <ActionButton
                label="Details"
                // dropdown
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
            >
                <ActionButton.Icon>
                    <FaRectangleList
                        viewBox="0 32 576 448"
                        style={{ width: "2em", height: "1em" }}
                    />
                </ActionButton.Icon>
            </ActionButton>
            <div className="dropdown-menu" style={{ zIndex: 1030 }}>
                <div>
                    <h6 className="dropdown-header">Selected parameters</h6>
                </div>
                {module.jobParameters.length === 0 && (
                    <p className="mb-0 px-4 text-muted text-nowrap">
                        {module.visibleName} has no parameters.
                    </p>
                )}
                {module.jobParameters.length > 0 && (
                    <ul className="ms-2">
                        {module.jobParameters.map((param) => (
                            <li key={param.name}>
                                <p className="mb-0 text-nowrap">
                                    <span className="fw-bold">
                                        {param.visibleName}:{" "}
                                    </span>
                                    {convertParamValueToString(
                                        job.params[
                                            snakeToCamelCase(param.name)
                                        ],
                                        param,
                                    )}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="dropdown-divider"></div>

                <div>
                    <h6 className="dropdown-header">Documentation</h6>
                </div>
                <a
                    className="dropdown-item text-primary px-4"
                    href={`/${module.id}/about`}
                    target="_blank"
                >
                    <FaExternalLinkAlt /> More about{" "}
                    <span className="fw-bold">{module.visibleName}</span>
                    {module.jobParameters.length > 0 && " and its parameters"}
                </a>
            </div>
        </div>
    )
}

export default memo(DocsActionButton)
