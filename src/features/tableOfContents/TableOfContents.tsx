import { type MouseEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ScrollSpy from "react-scrollspy-navigation"
import "./TableOfContents.css"

type TOCItem = {
    level: number
    id: string
    text: string
    children: TOCItem[]
    parent?: TOCItem | null
}

type TableOfContentsProps = {
    contentElement: HTMLElement | null
}

const renderTOC = (toc: TOCItem[]) => {
    return (
        <ul>
            {toc.map((item, index) =>
                // We need to avoid empty react nodes, because ScrollSpy cannot handle
                // them. For this reason, the following fragment looks redundant.
                item.children && item.children.length > 0 ? (
                    <li key={index}>
                        {/*
                         * Note: Creating a separate component for the link doesn't work,
                         * because react-scrollspy can't handle components containing the links.
                         */}
                        <a
                            className="text-decoration-none text-body-secondary fs-7"
                            href={`#${item.id}`}
                        >
                            {item.text}
                        </a>
                        {renderTOC(item.children)}
                    </li>
                ) : (
                    <li key={index}>
                        <a
                            className="text-decoration-none text-body-secondary fs-7"
                            href={`#${item.id}`}
                        >
                            {item.text}
                        </a>
                    </li>
                ),
            )}
        </ul>
    )
}

export default function TableOfContents({
    contentElement,
}: TableOfContentsProps) {
    const [toc, setToc] = useState<TOCItem | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (contentElement == null) return

        const headings = contentElement.querySelectorAll(
            "h1, h2, h3, h4, h5, h6",
        )

        // create a tree structure from the headings
        const toc: TOCItem = {
            id: "toc",
            text: "",
            level: 0,
            parent: null,
            children: [],
        }
        let current: TOCItem | null = toc

        for (const heading of headings) {
            const level = parseInt(heading.tagName.slice(1))
            const id = heading.id
            const text = heading.textContent

            // current level might differ by more than 1 from the heading level, e.g. h2 -> h4
            // this hints at a problem with the markdown file
            // nevertheless, this code should not fail in this case
            // -> use dummy nodes to fill the gap
            if (level > current.level + 1) {
                for (let i = current.level + 1; i < level; i++) {
                    const dummy = {
                        level: i,
                        id: `dummy-${i}`,
                        text: "",
                        children: [],
                        parent: current,
                    }
                    current.children.push(dummy)
                    current = dummy
                }
            } else if (level <= current.level) {
                // go back to the parent node
                while (level <= current.level) {
                    current = current.parent
                }
            }

            const node = { level, id, text, children: [], parent: current }
            current.children.push(node)
            current = node
        }

        setToc(toc)
    }, [contentElement])

    // ScrollRestoration can run while asynchronously loaded documentation still shows its loading
    // page. Once the TOC is built, retry an initial hash in case its heading did not exist yet.
    useEffect(() => {
        if (toc === null || window.location.hash === "") return

        const id = decodeURIComponent(window.location.hash.slice(1))
        document.getElementById(id)?.scrollIntoView()
    }, [toc])

    if (!toc) {
        return null
    }

    //
    // build table of contents from tree
    //
    const renderedToc = renderTOC(toc.children)

    // ScrollSpy prevents the anchor's default navigation. Forward the hash to React Router so
    // ScrollRestoration can perform the scroll and create a normal history entry.
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        const href = event.currentTarget.getAttribute("href")
        if (href !== null) {
            navigate(href)
        }
    }

    return (
        <ScrollSpy activeClass="active" onClickEach={handleClick}>
            <nav id="toc" className="toc">
                {renderedToc}
            </nav>
        </ScrollSpy>
    )
}
