import parse, { attributesToProps } from "html-react-parser"
import PropTypes from "prop-types"
import React, { useMemo, useRef } from "react"

export default function Molecule({
    molId,
    svgValue,
    selectedAtom,
    onSelectAtom,
}) {
    //
    // to improve performance, we render the SVG only once
    //
    const svg = useMemo(() => {
        const parseOptions = {
            replace: (domNode) => {
                if (
                    domNode !== undefined &&
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
                                onSelectAtom
                                    ? (e) => onSelectAtom(e, molId, atomId)
                                    : null
                            }
                            onMouseOut={
                                onSelectAtom
                                    ? (e) => onSelectAtom(e, molId, atomId)
                                    : null
                            }
                        />
                    )
                }
            },
        }

        const svg = parse(svgValue, parseOptions)
        return svg
    }, [molId, onSelectAtom])

    //
    // we dynamically add (and remove) a class to the correct atom when selected
    //
    const ref = useRef(null)

    React.useEffect(() => {
        if (ref.current && selectedAtom !== undefined) {
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
    }, [selectedAtom])

    return <div ref={ref}>{svg}</div>
}

Molecule.propTypes = {
    molId: PropTypes.number.isRequired,
    svgValue: PropTypes.string.isRequired,
    selectedAtom: PropTypes.number,
    onSelectAtom: PropTypes.func,
}
