import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import { RxCross1 } from "react-icons/rx"
import { moduleType } from "../../types"
import Molecule from "./Molecule"
import ProblemListBadge from "./ProblemListBadge"
import ProblemListCell from "./ProblemListCell"

export default function TableCell({
    module,
    result,
    resultProperty,
    rowSpan = undefined,
    selectedAtom,
    className,
    onSelectAtom,
    ...props
}) {
    const value = result[resultProperty.name]
    const molId = result.mol_id

    const compressed =
        resultProperty.level !== undefined &&
        resultProperty.level !== "molecule"

    const commonProps = {
        rowSpan,
        ...props,
        className: classNames(className, {
            compressed,
            highlighted:
                resultProperty.level === "atom" &&
                selectedAtom !== undefined &&
                selectedAtom.molId === result.mol_id &&
                selectedAtom.atomId === result.atom_id,
            // By default, all cells are aligned vertically at the center. If the module task is
            // atom or derivative property prediction, we would like to align the molecule-level
            // cells at the top.
            "align-top":
                module.task !== "molecular_property_prediction" &&
                resultProperty.level === "molecule",
        }),
    }

    if (resultProperty.type === "mol") {
        return (
            <td {...commonProps}>
                <div className="position-relative">
                    {value == null && (
                        <RxCross1
                            className="p-5 text-body-tertiary"
                            style={{ width: "300px", height: "180px" }}
                        />
                    )}
                    {value != null && (
                        <Molecule
                            className="position-relative"
                            molId={molId}
                            svgValue={value}
                            // if the column is "preprocessed_mol", we add a feature to select atoms
                            selectedAtom={
                                resultProperty.name === "preprocessed_mol" &&
                                selectedAtom.molId === molId
                                    ? selectedAtom.atomId
                                    : null
                            }
                            onSelectAtom={
                                resultProperty.name === "preprocessed_mol"
                                    ? onSelectAtom
                                    : null
                            }
                        />
                    )}
                    {resultProperty.name === "preprocessed_mol" && (
                        <ProblemListBadge problems={result.problems} />
                    )}
                </div>
            </td>
        )
    } else if (resultProperty.type === "text") {
        // unused at the moment
        if (compressed) {
            return (
                <td {...commonProps}>
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
                </td>
            )
        } else {
            return (
                <td {...commonProps} style={{ maxWidth: "300px" }}>
                    {value}
                </td>
            )
        }
    } else if (resultProperty.type === "float") {
        const precision = resultProperty.precision || 2
        if (value == null) {
            return <td {...commonProps}>-</td>
        } else if (typeof value === "number") {
            return <td {...commonProps}>{value.toFixed(precision)}</td>
        } else {
            return <td {...commonProps}>{value}</td>
        }
    } else if (resultProperty.type === "int") {
        if (value == null) {
            return <td {...commonProps}>-</td>
        } else {
            return <td {...commonProps}>{value}</td>
        }
    } else if (resultProperty.type === "bool") {
        if (value == null) {
            return <td {...commonProps}>-</td>
        } else {
            return <td {...commonProps}>{value ? "Yes" : "No"}</td>
        }
    } else if (resultProperty.type === "image") {
        if (value == null) {
            return <td {...commonProps}>-</td>
        } else {
            return (
                <td {...commonProps}>
                    <img
                        className="object-fit-contain"
                        src={value}
                        width={300}
                        height={180}
                    />
                </td>
            )
        }
    } else if (resultProperty.type === "problem_list") {
        if (value == null) {
            return <td {...commonProps}>-</td>
        } else {
            return ProblemListCell({ problems: value, ...commonProps })
        }
    } else {
        console.warn(
            `Unknown result property type: ${resultProperty.type} for ${resultProperty.name}`,
        )
        if (value == null) {
            return <td {...commonProps}>-</td>
        } else {
            return <td {...commonProps}>{value}</td>
        }
    }
}

TableCell.propTypes = {
    module: moduleType.isRequired,
    result: PropTypes.object.isRequired,
    resultProperty: PropTypes.object.isRequired,
    value: PropTypes.any,
    rowSpan: PropTypes.number,
    compressed: PropTypes.bool,
    selectedAtom: PropTypes.shape({
        molId: PropTypes.number,
        atomId: PropTypes.number,
    }),
    highlighted: PropTypes.bool,
    className: PropTypes.string,
    onSelectAtom: PropTypes.func,
    molId: PropTypes.number,
}
