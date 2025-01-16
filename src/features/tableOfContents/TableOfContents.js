import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ScrollSpy from "react-scrollspy-navigation"
import { refType } from "../../types"
import "./style.scss"

const renderTOC = (toc) => {
    return (
        <ul>
            {toc.map((item, index) =>
                // We need to avoid empty react nodes, because ScrollSpy cannot handle
                // them. For this reason, the following fragment looks redundant.
                item.children && item.children.length > 0 ? (
                    <li key={index}>
                        <a href={`#${item.id}`}>{item.text}</a>
                        {renderTOC(item.children)}
                    </li>
                ) : (
                    <li key={index}>
                        <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                ),
            )}
        </ul>
    )
}

export default function TableOfContents({ contentRef }) {
    const [toc, setToc] = useState(null)
    const navigate = useNavigate()

    const offsetTop = 50

    useEffect(() => {
        if (!contentRef.current) return

        const content = contentRef.current
        const headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6")

        // create a tree structure from the headings
        const toc = { level: 0, parent: null, children: [] }
        let current = toc

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
    }, [contentRef])

    const scrollToHash = (hash) => {
        const id = hash.slice(1)
        const target = document.getElementById(id)
        if (target) {
            window.scrollTo({
                top: target.offsetTop - offsetTop,
                left: target.offsetLeft,
                behavior: "smooth",
            })
        }
    }

    // when mounting, scroll to heading matching the URL hash
    useEffect(() => {
        const { hash } = window.location

        if (toc && hash) {
            scrollToHash(hash)
        }
    }, [toc])

    if (!toc) {
        return null
    }

    //
    // build table of contents from tree
    //
    const renderedToc = renderTOC(toc.children)

    // The normal click handler of ScrollSpy does not work. We replace it with
    // our own handler that scrolls to the target element and updates the URL.

    const handleClick = (e) => {
        const href = e.target.getAttribute("href")
        scrollToHash(href)
    }

    const handleChangeActiveId = (id) => {
        // update the URL with the new active id
        // (replace=true to avoid creating a new history entry)
        navigate(`#${id}`, { replace: true })
    }

    return (
        <ScrollSpy
            activeClass="active"
            // When clicking on a link in the toc, scroll to the corresponding heading
            // but leave some space at the top of the screen.
            offsetTop={offsetTop}
            // when the user scrolls somewhere, update the URL
            onChangeActiveId={handleChangeActiveId}
            // replace the click handler with our own
            onClickEach={handleClick}
        >
            <nav id="toc" className="toc">
                {renderedToc}
            </nav>
        </ScrollSpy>
    )
}

TableOfContents.propTypes = {
    contentRef: refType.isRequired,
}
