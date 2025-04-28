import type { Module, Result } from "@/types"
import classNames from "classnames"
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
    const molId = result.mol_id

    // compressed: cell is smaller when it refers to an atom / derivative entry
    const compressed =
        resultProperty.level !== undefined &&
        resultProperty.level !== "molecule"

    //
    // figure out content to render
    //
    let cellContent
    if (resultProperty.type === "mol") {
        cellContent = (
            <div className="position-relative">
                {value == null && (
                    <RxCross1
                        className="p-5 text-body-tertiary"
                        style={{ width: "300px", height: "180px" }}
                    />
                )}
                {value != null &&
                    resultProperty.name === "preprocessed_mol" && (
                        <Molecule
                            //className="position-relative"
                            molId={molId}
                            svgValue={value}
                            group={group}
                            // color palette for atoms
                            propertyPalettes={propertyPalettes}
                            // feature to select atoms
                            selectedAtom={selectedAtom}
                            onAtomSelect={onAtomSelect}
                        />
                    )}
                {value != null &&
                    resultProperty.name !== "preprocessed_mol" && (
                        <Molecule
                            //className="position-relative"
                            molId={molId}
                            svgValue={value}
                        />
                    )}
                {resultProperty.name === "preprocessed_mol" && (
                    <ProblemListBadge problems={result.problems} />
                )}
            </div>
        )
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
    } else if (resultProperty.type === "int") {
        if (value == null) {
            cellContent = "-"
        } else {
            cellContent = value
        }
    } else if (resultProperty.type === "bool") {
        if (value == null) {
            cellContent = "-"
        } else {
            cellContent = value ? "Yes" : "No"
        }
    } else if (resultProperty.type === "image") {
        if (value == null) {
            cellContent = "-"
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
    } else if (resultProperty.type === "string") {
        if (value == null) {
            cellContent = "-"
        } else {
            cellContent = value
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
            // By default, all cells are aligned vertically at the center. If the module task is
            // atom or derivative property prediction, we would like to align the molecule-level
            // cells at the top.
            "align-top":
                module.task !== "molecular_property_prediction" &&
                resultProperty.level === "molecule",
            "d-none": !resultProperty.visible,
        }),
        style: {
            backgroundColor: propertyPalettes[resultProperty.name](value),
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
