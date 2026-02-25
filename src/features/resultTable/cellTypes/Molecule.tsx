import { useAppSelector } from "@/app/hooks"
import { useColorPalettesContext } from "@/features/colorPalettes/hooks"
import ImagePlaceholder from "@/features/placeholder/ImagePlaceholder"
import {
    ResultGroup,
    selectAtomColorProperty,
} from "@/features/resultTable/resultTableSlice"
import { useGetResourceQuery } from "@/services/resources"
import parse, { attributesToProps, domToReact } from "html-react-parser"
import { useEffect, useMemo, useRef, useState } from "react"
import "./Molecule.css"

type MoleculeProps = {
    svgValue: string
    selectedAtom?: number
    onAtomSelect?: (atomId?: number) => void
    group: ResultGroup
}

export default function Molecule({
    svgValue,
    selectedAtom,
    onAtomSelect,
    group,
}: MoleculeProps) {
    const atomColorProperty = useAppSelector(selectAtomColorProperty)
    const { getPalette } = useColorPalettesContext()

    const [svgAsString, setSvgAsString] = useState(svgValue)
    const [svg, setSvg] = useState<React.ReactElement | null>(null)
    const { data, error, isLoading } = useGetResourceQuery(svgValue, {
        skip:
            svgValue == null ||
            svgValue.startsWith("<svg") ||
            svgValue.startsWith("<?xml"),
    })

    useEffect(() => {
        if (data != null && !isLoading && !error) {
            setSvgAsString(data)
        }
    }, [data, error, isLoading, setSvgAsString])

    const ref = useRef<SVGSVGElement>(null)

    //
    // compute atom colors
    //
    const atomColors = useMemo(() => {
        if (atomColorProperty == null || onAtomSelect == null) return undefined

        const colorScale = getPalette(atomColorProperty?.name)
        if (colorScale == null) return undefined

        // if a molecule has only one atom entry with atom_id = null, then it is a dummy row
        // signaling an invalid computation -> do not color the atoms
        if (group.children.length === 1 && group.children[0].atom_id == null)
            return undefined

        const atomColors: Record<number, string> = {}
        for (const result of group.children) {
            const atomId = result.atom_id
            if (atomId !== null) {
                const propertyValue = result[atomColorProperty.name]
                const color = colorScale(propertyValue)
                atomColors[atomId] = color
            }
        }

        return atomColors
    }, [group, atomColorProperty, getPalette])

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
                    // TODO: still needed?
                    const updatedAttribs = {
                        ...domNode.attribs,
                        className: "molecule",
                    }

                    // The SVG contains an ellipse with class "atom-x" for each atom in the
                    // molecule (where x is the atom id). The ellipses for atoms are rendered
                    // after / on top of anything else.
                    // -> This makes selection less jittery, because hovering over the ellipses
                    //    is not interrupted when touching a label / bond.
                    // BUT: coloring theses ellipses would cover the element labels, etc.
                    // -> copy the ellipses and put that at the start of the SVG
                    const children = domToReact(domNode.children, parseOptions)

                    const ellipses = children.filter(
                        (child) => child.type === "ellipse",
                    )

                    const ellipseCopies =
                        atomColors !== undefined
                            ? ellipses.map((ellipse, i: number) => {
                                  // -> extract the atom id from the class name
                                  const atomId = parseInt(
                                      ellipse.props.className.replace(
                                          "atom-",
                                          "",
                                      ),
                                  )

                                  // set the background color of the atom
                                  const fill =
                                      atomColors[atomId] ?? "transparent"

                                  const updatedAttribs = {
                                      ...ellipse.props,
                                      className:
                                          ellipse.props.className.replace(
                                              "atom-",
                                              "color-",
                                          ),
                                      style: { fill },
                                  }

                                  return (
                                      <ellipse
                                          key={`copy-${i}`}
                                          {...updatedAttribs}
                                      />
                                  )
                              })
                            : []

                    const rest = children.filter(
                        (child) => child.type !== "ellipse",
                    )

                    const newChildren = [...ellipseCopies, ...rest, ...ellipses]

                    return (
                        <svg ref={ref} {...attributesToProps(updatedAttribs)}>
                            {newChildren}
                        </svg>
                    )
                } else if (
                    domNode.name === "ellipse" &&
                    domNode.attribs &&
                    domNode.attribs.class !== undefined &&
                    domNode.attribs.class.startsWith("atom-")
                ) {
                    // the SVG contains an ellipse with class "atom-x" for each atom in the molecule
                    // (x is the atom id)
                    // -> extract the atom id from the class name
                    const atomId = parseInt(
                        domNode.attribs.class.replace("atom-", ""),
                    )

                    const updatedAttribs = {
                        ...domNode.attribs,
                    }

                    return (
                        <ellipse
                            {...attributesToProps(updatedAttribs)}
                            onMouseEnter={
                                onAtomSelect
                                    ? () => onAtomSelect(atomId)
                                    : undefined
                            }
                            onMouseOut={
                                onAtomSelect
                                    ? () => onAtomSelect(undefined)
                                    : undefined
                            }
                        />
                    )
                }
            },
        }

        // TODO: is there a better way to recognize SVGs?
        if (
            svgAsString != null &&
            (svgAsString.startsWith("<svg") || svgAsString.startsWith("<?xml"))
        ) {
            const svg = parse(svgAsString, parseOptions)
            setSvg(svg as React.ReactElement)
        }
    }, [svgAsString, onAtomSelect, atomColors])

    //
    // we dynamically add (and remove) a class to the correct atom when selected
    //
    useEffect(() => {
        if (ref.current && selectedAtom !== undefined && svg !== null) {
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

    return svg ?? <ImagePlaceholder className="molecule" />
}
