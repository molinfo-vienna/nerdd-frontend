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
    }
    if (jobParameter.type === "boolean" || jobParameter.type === "bool") {
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
                <div className="container px-4">
                    {module.jobParameters.map((param) => (
                        <div key={param.name} className="row">
                            <div className="col-auto">{param.visibleName}:</div>
                            <div className="col">
                                {convertParamValueToString(
                                    job.params[snakeToCamelCase(param.name)],
                                    param,
                                )}
                            </div>
                        </div>
                    ))}
                </div>
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
                    <span className="fw-bold">{module.visibleName}</span> and
                    its parameters
                </a>
            </div>
        </div>
    )
}

export default memo(DocsActionButton)
