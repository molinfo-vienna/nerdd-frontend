import { useGetModulePublicationsQuery } from "@/services"
import { Cite } from "@citation-js/core"
import "@citation-js/plugin-bibtex"
import "@citation-js/plugin-csl"
import hljs from "highlight.js/lib/core"
import { useMemo } from "react"
import { FaRegFileAlt } from "react-icons/fa"
import { FaBook } from "react-icons/fa6"
import TabCard from "../tabCard/TabCard"
import bibtex from "./bibtex"
import { nerddPublication } from "./nerddPublication"

hljs.registerLanguage("bibtex", bibtex)

function transformToApaRaw(publications): string {
    return publications
        .map((pub) =>
            new Cite(pub).format("bibliography", {
                format: "text",
                template: "apa",
                lang: "en-US",
            }),
        )
        .join("\n\n")
}

function transformToApa(publications): JSX.Element[] | JSX.Element {
    return (
        <>
            {publications.map((pub, i) => (
                <p
                    key={i}
                    dangerouslySetInnerHTML={{
                        __html: new Cite(pub).format("bibliography", {
                            format: "html",
                            template: "apa",
                            lang: "en-US",
                        }),
                    }}
                />
            ))}
        </>
    )
}

function transformToBibtexRaw(publications): string {
    return publications.map((pub) => new Cite(pub).format("bibtex")).join("")
}

function transformToBibtex(publications): JSX.Element[] | JSX.Element {
    const bibtex = transformToBibtexRaw(publications)

    return (
        <pre className="mb-1 bg-primary-subtle">
            <code
                className={`hljs language-bibtex bg-primary-subtle p-0`}
                dangerouslySetInnerHTML={{
                    __html: hljs.highlight(bibtex, {
                        language: "bibtex",
                    }).value,
                }}
            />
        </pre>
    )
}

const mapping = [
    {
        style: "apa",
        icon: <FaRegFileAlt />,
        label: "APA",
        transformRaw: transformToApaRaw,
        transform: transformToApa,
    },
    {
        style: "bibtex",
        icon: <FaBook />,
        label: "BibTex",
        transformRaw: transformToBibtexRaw,
        transform: transformToBibtex,
    },
]

type PublicationCardProps = {
    moduleId?: string
    style: string
    onSelectStyle: (language: string) => void
}

export default function PublicationCard({
    moduleId,
    style,
    onSelectStyle,
}: PublicationCardProps) {
    const {
        data: publications,
        isLoading,
        error,
    } = useGetModulePublicationsQuery(moduleId)

    const styles = useMemo(() => {
        if (isLoading) {
            return []
        }

        if (error) {
            return mapping.map(() => ({
                raw: undefined,
                content: <p>Error loading publications.</p>,
            }))
        }

        const augmentedPublications = [...publications, nerddPublication]

        return mapping.map(({ transformRaw, transform }) => ({
            raw: transformRaw(augmentedPublications),
            content: transform(augmentedPublications),
        }))
    }, [publications, isLoading, error])

    return (
        <TabCard activeTab={style} onSelectTab={onSelectStyle}>
            {mapping.map(({ style, label, icon }, i) => (
                <TabCard.Tab
                    key={style}
                    name={style}
                    label={label}
                    icon={icon}
                    contentToCopy={!isLoading ? styles[i].raw : undefined}
                >
                    {!isLoading && styles[i].content}
                    {isLoading && (
                        <p className="placeholder-glow">
                            <span className="placeholder col-7"></span>{" "}
                            <span className="placeholder col-4"></span>{" "}
                            <span className="placeholder col-4"></span>{" "}
                            <span className="placeholder col-6"></span>{" "}
                            <span className="placeholder col-8"></span>{" "}
                        </p>
                    )}
                </TabCard.Tab>
            ))}
        </TabCard>
    )
}
