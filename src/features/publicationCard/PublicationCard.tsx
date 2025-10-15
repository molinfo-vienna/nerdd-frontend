import { Publication } from "@/types"
import { Author } from "@/types/publication"
import hljs from "highlight.js/lib/core"
import { useMemo } from "react"
import { FaRegFileAlt } from "react-icons/fa"
import { FaBook } from "react-icons/fa6"
import "./arctis.css"
import TabCard from "../tabCard/TabCard"
import bibtex from "./bibtex"

hljs.registerLanguage("bibtex", bibtex)

const BIBTEX_TEMPLATE = `@article{<CITE_KEY>,
  title={<TITLE>},
  author={<AUTHOR_LIST>},
  journal={<JOURNAL>},
  year={<YEAR>},
  doi={<DOI>}
}`

function formatAuthor(author: Author): string {
    // handle multipe first names like "Jean-Luc"
    const firstNames = author.firstName.split("-")
    const initials = firstNames.map((name) => name.charAt(0)).join("-")
    return `${author.lastName}, ${initials}.`
}

function transformToApaRaw(publications: Publication[]): string {
    return publications
        .map((pub) => {
            const authors = pub.authors.map(formatAuthor).join(", ")

            return `${authors} (${pub.year}). ${pub.title}. ${pub.journal}. ${pub.doi}`
        })
        .join("\n\n")
}

function transformToApa(
    publications: Publication[],
): JSX.Element[] | JSX.Element {
    return publications.map((pub) => {
        const authors = pub.authors.map(formatAuthor).join(", ")

        return (
            <p>
                {authors} ({pub.year}). {pub.title}. <em>{pub.journal}</em>.{" "}
                <a href={`https://doi.org/${pub.doi}`} className="text-nowrap">
                    {pub.doi}
                </a>
            </p>
        )
    })
}

function transformToBibtexRaw(publications: Publication[]): string {
    return publications
        .map((pub) => {
            const authorList = pub.authors
                .map((author) => `${author.lastName}, ${author.firstName}`)
                .join(" and ")

            const citeKey = `${pub.authors[0].lastName}${pub.year}`

            return BIBTEX_TEMPLATE.replace("<CITE_KEY>", citeKey)
                .replace("<TITLE>", pub.title)
                .replace("<AUTHOR_LIST>", authorList)
                .replace("<JOURNAL>", pub.journal)
                .replace("<VOLUME>", pub.volume)
                .replace("<YEAR>", pub.year.toString())
                .replace("<DOI>", pub.doi)
        })
        .join("\n\n")
}

function transformToBibtex(
    publications: Publication[],
): JSX.Element[] | JSX.Element {
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

const nerddPublication: Publication = {
    title: "A Scalable Microservices Platform for Deploying Machine Learning Models in Drug Discovery and Beyond",
    authors: [
        { firstName: "Steffen", lastName: "Hirte" },
        { firstName: "Vincent-Alexander", lastName: "Scholz" },
        { firstName: "Johannes", lastName: "Kirchmair" },
    ],
    journal: "ChemRxiv",
    year: 2025,
    doi: "10.26434/chemrxiv-2025-thhkd",
}

type PublicationCardProps = {
    publications: Publication[]
    style: string
    onSelectStyle: (language: string) => void
}

export default function PublicationCard({
    publications,
    style,
    onSelectStyle,
}: PublicationCardProps) {
    const augmentedPublications = [...publications, nerddPublication]

    const styles = useMemo(() => {
        return mapping.map(({ transformRaw, transform }) => ({
            raw: transformRaw(augmentedPublications),
            content: transform(augmentedPublications),
        }))
    }, [augmentedPublications])

    return (
        <TabCard activeTab={style} onSelectTab={onSelectStyle}>
            {mapping.map(({ style, label, icon }, i) => (
                <TabCard.Tab
                    key={style}
                    name={style}
                    label={label}
                    icon={icon}
                    contentToCopy={styles[i].raw}
                >
                    {styles[i].content}
                </TabCard.Tab>
            ))}
        </TabCard>
    )
}
