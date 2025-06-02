import hljs from "highlight.js/lib/core"
import python from "highlight.js/lib/languages/python"

import classNames from "classnames"
import { FaPython } from "react-icons/fa6"
import "./ApiCard.css"
import "./arctis.css"

import { Module } from "@/types"
import { useMemo } from "react"
import CopyToClipboard from "./CopyToClipboard"
import createComplexJobPython from "./createComplexJobPython.md?raw"
import createJobWithFilePython from "./createJobWithFilePython.md?raw"
import createSimpleJobPython from "./createSimpleJobPython.md?raw"
import deleteJobPython from "./deleteJobPython.md?raw"
import getJobStatusPython from "./getJobStatusPython.md?raw"
import getResultsPython from "./getResultsPython.md?raw"
import quickstartPython from "./quickstartPython.md?raw"

hljs.registerLanguage("python", python)

type ApiCardProps = {
    baseUrl: string
    module: Module
    exampleName:
        | "quickstart"
        | "createSimpleJob"
        | "createComplexJob"
        | "createJobWithFile"
        | "getJobStatus"
        | "getResults"
        | "deleteJob"
    selectedLanguage: string
    onSelectLanguage: (language: string) => void
}

const mapping = [
    {
        language: "python",
        icon: <FaPython />,
        label: "Python",
        quickstart: quickstartPython,
        createSimpleJob: createSimpleJobPython,
        createComplexJob: createComplexJobPython,
        createJobWithFile: createJobWithFilePython,
        getJobStatus: getJobStatusPython,
        getResults: getResultsPython,
        deleteJob: deleteJobPython,
    },
]

const exampleSmiles = "CN1C=NC2=C1C(=O)N(C(=O)N2C)C"

export default function ApiCard({
    baseUrl,
    module,
    exampleName,
    selectedLanguage,
    onSelectLanguage,
}: ApiCardProps) {
    const codeSnippets = useMemo(() => {
        return mapping.map((m) => {
            let code
            if (m[exampleName] === undefined) {
                code = ""
            }

            code = m[exampleName]
                .replaceAll("__BASE_URL__", baseUrl)
                .replaceAll("__MODULE_ID__", module.id)
                .replaceAll("__EXAMPLE_SMILES__", exampleSmiles)

            if (exampleName === "createSimpleJob") {
                // format as GET parameters
                const jobParameterLines = module.jobParameters
                    .filter((param) => param.default !== undefined)
                    .map((param) => {
                        return `    "&${param.name}=${param.default}"`
                    })

                const jobParametersBlock =
                    jobParameterLines.length > 0
                        ? "\n" + jobParameterLines.join("\n")
                        : ""

                code = code.replaceAll("__JOB_PARAMETERS__", jobParametersBlock)
            } else {
                const _t = (value: any) => {
                    if (typeof value === "string") {
                        return `"${value}"`
                    } else {
                        return value
                    }
                }

                const jobParameterLines = module.jobParameters
                    .filter((param) => param.default !== undefined)
                    .map(
                        (param) =>
                            `        "${param.name}": ${_t(param.default)}`,
                    )

                const jobParametersBlock =
                    jobParameterLines.length > 0
                        ? "\n" + jobParameterLines.join("\n")
                        : ""

                code = code.replaceAll("__JOB_PARAMETERS__", jobParametersBlock)
            }

            return {
                language: m.language,
                code,
            }
        })
    }, [exampleName, baseUrl, module])

    const selectedCode = useMemo(() => {
        const code = codeSnippets.find(
            (snippet) => snippet.language === selectedLanguage,
        )
        return code ? code.code : ""
    }, [selectedLanguage, codeSnippets])

    return (
        <div className="card rounded-4 hljs border-0 mb-5 bg-primary-subtle">
            <div className="card-header text-primary bg-primary-subtle border-0 pb-0 border-bottom">
                <ul className="nav nav-pills ms-2" role="tablist">
                    {mapping.map(({ language, label, icon }) => (
                        <li key={language} className="" role="presentation">
                            <button
                                className={classNames(
                                    "btn btn-underline fs-7",
                                    {
                                        active: selectedLanguage === language,
                                    },
                                )}
                                id={`${language}-button`}
                                type="button"
                                role="tab"
                                aria-controls={language}
                                aria-selected={selectedLanguage === language}
                                onClick={() => onSelectLanguage(language)}
                            >
                                <span className="align-middle">{icon}</span>
                                <span className="ms-2 align-middle">
                                    {label}
                                </span>
                            </button>
                        </li>
                    ))}
                    {/* Add an item filling the remaining space to push the last tab to the right */}
                    <li className="flex-fill"></li>
                    {/* Copy to clipboard */}
                    <li className="nav-item">
                        <CopyToClipboard textToCopy={selectedCode} />
                    </li>
                </ul>
            </div>
            <div className="card-body tab-content">
                {codeSnippets.map((m) => (
                    <div
                        key={m.language}
                        className={classNames("tab-pane px-3", {
                            active: selectedLanguage === m.language,
                        })}
                        id={`${m.language}-tab`}
                        role="tabpanel"
                        aria-labelledby={`${m.language}-tab`}
                        tabIndex={0}
                    >
                        <pre className="mb-1 bg-primary-subtle">
                            <code
                                className={`hljs language-${m.language} bg-primary-subtle p-0`}
                                dangerouslySetInnerHTML={{
                                    __html: hljs.highlight(m.code, {
                                        language: m.language,
                                    }).value,
                                }}
                            />
                        </pre>
                    </div>
                ))}
            </div>
        </div>
    )
}
