import type { Module, Result } from "@/types"
import classNames from "classnames"
import { rgb } from "d3-color"
import { RxCross1 } from "react-icons/rx"
import Molecule from "./Molecule"
import ProblemListBadge from "./ProblemListBadge"
import ProblemListCell from "./ProblemListCell"
import { ResultGroup, type AugmentedResultProperty } from "./resultTableSlice"

type TableCellProps = {
    module: Module
    result: Result
    resultProperty: AugmentedResultProperty
    group: ResultGroup
    selectedAtom?: number
    className?: string
    onAtomSelect?: (atomId?: number) => void
    propertyPalettes: Record<string, any>
}

export default function TableCell({
    module,
    result,
    resultProperty,
    group,
    selectedAtom,
    className,
    onAtomSelect,
    propertyPalettes,
}: TableCellProps) {
    const value = result[resultProperty.name]

    // compressed: cell is smaller when it refers to an atom / derivative entry
    const compressed =
        resultProperty.level !== undefined &&
        resultProperty.level !== "molecule"

    //
    // figure out content to render
    //
    let cellContent
    if (resultProperty.type === "mol") {
        if (resultProperty.name === "preprocessed_mol") {
            // The property preprocessed_mol is special, because
            // * we put the processing / loading errors at the top right of this cell
            // * the molecule image will always be on maximum size (not zoonable on hover)
            // * the atoms in this molecule depiction are selectable
            cellContent = (
                <div className="position-relative">
                    {value == null && (
                        <RxCross1 className="error p-5 text-body-tertiary" />
                    )}
                    {value != null && (
                        <Molecule
                            svgValue={value}
                            group={group}
                            // color palette for atoms
                            propertyPalettes={propertyPalettes}
                            // atom selection
                            selectedAtom={selectedAtom}
                            onAtomSelect={onAtomSelect}
                        />
                    )}
                    <ProblemListBadge problems={result.problems} />
                </div>
            )
        } else {
            // If the current property is not preprocessed_mol, we opt for a molecule image that
            // * is zoomable on hover (zoomable wrapper div)
            // * shows a molecule on smaller size
            // * disables atom selection
            cellContent = (
                <div className="zoomable">
                    {value == null && (
                        <RxCross1 className="error p-5 text-body-tertiary" />
                    )}
                    {value != null && (
                        <Molecule
                            svgValue={value}
                            group={group}
                            propertyPalettes={propertyPalettes}
                            // atom selection is disabled
                        />
                    )}
                </div>
            )
        }
    } else if (resultProperty.type === "text") {
        // unused at the moment
        if (compressed) {
            cellContent = (
                <div
                    style={{
                        maxWidth: "300px",
                        height: "25px",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            width: "280px",
                            height: "100%",
                            overflowX: "hidden",
                            overflowY: "scroll",
                        }}
                    >
                        {value}
                    </div>
                </div>
            )
        } else {
            cellContent = value
        }
    } else if (resultProperty.type === "float") {
        const precision = resultProperty.precision || 2
        if (value == null) {
            cellContent = "-"
        } else if (typeof value === "number") {
            cellContent = value.toFixed(precision)
        } else {
            cellContent = value
        }
    } else if (
        resultProperty.type === "int" ||
        resultProperty.type === "integer"
    ) {
        if (value == null) {
            cellContent = "-"
        } else {
            cellContent = value
        }
    } else if (
        resultProperty.type === "bool" ||
        resultProperty.type === "boolean"
    ) {
        if (value == null) {
            cellContent = "-"
        } else {
            cellContent = value ? "Yes" : "No"
        }
    } else if (resultProperty.type === "image") {
        if (value == null) {
            cellContent = "-"
        } else {
            if (compressed) {
                // Images on compressed cells (e.g. atom or derivative properties) are smaller,
                // but zoomable on hover.
                cellContent = (
                    <div className="zoomable">
                        <img
                            className="object-fit-contain"
                            src={value}
                            width={150}
                            height={90}
                        />
                    </div>
                )
            } else {
                cellContent = (
                    <img
                        className="object-fit-contain"
                        src={value}
                        width={300}
                        height={180}
                    />
                )
            }
        }
    } else if (resultProperty.type === "problem_list") {
        if (value == null) {
            cellContent = "-"
        } else {
            cellContent = ProblemListCell({ problems: value })
        }
    } else if (resultProperty.type === "source_list") {
        if (value == null) {
            cellContent = "-"
        } else {
            cellContent = value
        }
    } else if (resultProperty.type === "representation") {
        if (value == null) {
            cellContent = "-"
        } else {
            cellContent = value
        }
    } else if (
        resultProperty.type === "string" ||
        resultProperty.type === "str"
    ) {
        if (value == null) {
            cellContent = "-"
        } else {
            if (resultProperty.choices != null) {
                const choice = resultProperty.choices.find(
                    (choice) => choice.value === value,
                )
                if (choice != null) {
                    cellContent = choice.label
                } else {
                    cellContent = value
                }
            } else {
                cellContent = value
            }
        }
    } else {
        console.warn(
            `Unknown result property type: ${resultProperty.type} for ${resultProperty.name}`,
        )
        if (value == null) {
            cellContent = "-"
        } else {
            cellContent = value
        }
    }

    //
    // figure out background color (and contrast text color)
    //
    const backgroundColor = resultProperty.colored
        ? propertyPalettes[resultProperty.name](value)
        : undefined
    let needsLightText = false
    if (backgroundColor !== undefined) {
        const { r, g, b } = rgb(backgroundColor)
        const luminance =
            (0.2126 * r) / 255 + (0.7152 * g) / 255 + (0.0722 * b) / 255
        needsLightText = luminance < 0.5
    }

    //
    // render actual table cell
    //
    const commonProps = {
        rowSpan: compressed ? 1 : group.children.length,
        className: classNames(className, {
            compressed,
            highlighted:
                resultProperty.level === "atom" &&
                selectedAtom === result.atom_id,
            "start-block": resultProperty.startBlock,
            "end-block": resultProperty.endBlock,
            "text-start": resultProperty.type === "problem_list",
            // By default, all cells are aligned vertically at the center. If the module task is
            // atom or derivative property prediction, we would like to align the molecule-level
            // cells at the top.
            "align-top":
                module.task !== "molecular_property_prediction" &&
                resultProperty.level === "molecule",
            "d-none": !resultProperty.visible,
            "text-light": needsLightText,
        }),
        style: {
            backgroundColor,
        },
        onMouseEnter: (e) =>
            resultProperty.level === "atom" && onAtomSelect
                ? onAtomSelect(result.atom_id)
                : null,
        onMouseOut: (e) =>
            resultProperty.level === "atom" && onAtomSelect
                ? onAtomSelect(undefined)
                : null,
    }

    return <td {...commonProps}>{cellContent}</td>
}
