import hljs from "highlight.js/lib/core"
import python from "highlight.js/lib/languages/python"

import { FaPython } from "react-icons/fa6"

import { Module } from "@/types"
import { useMemo } from "react"
import TabCard from "../tabCard/TabCard"
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
                            `        "${param.name}": ${_t(param.default)},`,
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
        <TabCard activeTab={selectedLanguage} onSelectTab={onSelectLanguage}>
            {mapping.map(({ language, label, icon }, i) => (
                <TabCard.Tab
                    key={language}
                    name={language}
                    label={label}
                    icon={icon}
                    contentToCopy={codeSnippets[i].code}
                >
                    <pre className="mb-1 bg-primary-subtle">
                        <code
                            className={`hljs language-${language} bg-primary-subtle p-0`}
                            dangerouslySetInnerHTML={{
                                __html: hljs.highlight(codeSnippets[i].code, {
                                    language: language,
                                }).value,
                            }}
                        />
                    </pre>
                </TabCard.Tab>
            ))}
        </TabCard>
    )
}
