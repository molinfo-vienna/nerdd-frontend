import parse, { attributesToProps, domToReact } from "html-react-parser"
import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"

export default function Molecule({
    molId,
    svgValue,
    selectedAtom,
    onAtomSelect,
}) {
    const [svg, setSvg] = useState(null)

    const ref = useRef(null)

    //
    // to improve performance, we render the SVG only once
    //
    useEffect(() => {
        const parseOptions = {
            replace: (domNode) => {
                if (domNode === undefined) {
                    return
                }

                if (domNode.name === "svg") {
                    const updatedAttribs = {
                        ...domNode.attribs,
                        className: "molecule",
                    }

                    return (
                        <svg ref={ref} {...attributesToProps(updatedAttribs)}>
                            {domToReact(domNode.children, parseOptions)}
                        </svg>
                    )
                } else if (
                    domNode.name === "ellipse" &&
                    domNode.attribs &&
                    domNode.attribs.class !== undefined &&
                    domNode.attribs.class.startsWith("atom")
                ) {
                    const updatedAttribs = {
                        ...domNode.attribs,
                    }

                    const atomId = parseInt(
                        domNode.attribs.class.replace("atom-", ""),
                    )

                    return (
                        <ellipse
                            {...attributesToProps(updatedAttribs)}
                            onMouseEnter={
                                onAtomSelect
                                    ? (e) => onAtomSelect(molId, atomId)
                                    : null
                            }
                            onMouseOut={
                                onAtomSelect
                                    ? (e) => onAtomSelect(undefined, undefined)
                                    : null
                            }
                        />
                    )
                }
            },
        }

        // TODO: is there a better way to recognize SVGs?
        if (svgValue.startsWith("<svg") || svgValue.startsWith("<?xml")) {
            const svg = parse(svgValue, parseOptions)
            setSvg(svg)
        } else {
            // svgValue is a URL pointing to an svg file
            fetch(svgValue)
                .then((response) => response.text())
                .then((text) => {
                    const svg = parse(text, parseOptions)
                    setSvg(svg)
                })
        }
    }, [molId, onAtomSelect])

    //
    // we dynamically add (and remove) a class to the correct atom when selected
    //
    useEffect(() => {
        if (ref !== null && selectedAtom !== undefined && svg !== null) {
            const atoms = ref.current.querySelectorAll(`.atom-${selectedAtom}`)
            atoms.forEach((atom) => {
                atom.classList.add("selected")
            })

            return () => {
                atoms.forEach((atom) => {
                    atom.classList.remove("selected")
                })
            }
        }
    }, [selectedAtom, svg])

    return svg
}

Molecule.propTypes = {
    molId: PropTypes.number.isRequired,
    svgValue: PropTypes.string.isRequired,
    selectedAtom: PropTypes.number,
    onAtomSelect: PropTypes.func,
}
