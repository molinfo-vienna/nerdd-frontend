import PropTypes from "prop-types"
import React from "react"
import { RxCross1 } from "react-icons/rx"
import Molecule from "./Molecule"

export default function TableCell({
    resultProperty,
    value,
    rowSpan = undefined,
    compressed = false,
    selectedAtom,
    highlighted,
    className = "",
    onSelectAtom,
    molId,
    ...props
}) {
    const commonProps = {
        key: resultProperty.name,
        rowSpan,
        ...props,
        className: `${className} ${compressed ? "compressed align-middle" : ""} ${highlighted ? "highlighted" : ""}`,
    }

    if (resultProperty.type === "mol") {
        if (value == null) {
            return (
                <td {...commonProps}>
                    <RxCross1
                        className="p-5 text-body-tertiary"
                        style={{ width: "300px", height: "180px" }}
                    />
                </td>
            )
        } else {
            // if the column is "preprocessed_mol", we add a feature to select atoms
            const molProps =
                resultProperty.name === "preprocessed_mol"
                    ? {
                          selectedAtom,
                          onSelectAtom,
                      }
                    : {}

            return (
                <td {...commonProps}>
                    <Molecule molId={molId} svgValue={value} {...molProps} />
                </td>
            )
        }
    } else if (resultProperty.type === "text") {
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
        return (
            <td {...commonProps}>
                {value != null && typeof value === "number"
                    ? value.toFixed(precision)
                    : value}
            </td>
        )
    } else if (resultProperty.type === "int") {
        return <td {...commonProps}>{value}</td>
    } else if (resultProperty.type === "bool") {
        return <td {...commonProps}>{value ? "Yes" : "No"}</td>
    } else if (resultProperty.type === "image") {
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
    } else {
        return <td {...commonProps}>{value}</td>
    }
}

TableCell.propTypes = {
    resultProperty: PropTypes.object.isRequired,
    value: PropTypes.any,
    rowSpan: PropTypes.number,
    compressed: PropTypes.bool,
    selectedAtom: PropTypes.number,
    highlighted: PropTypes.bool,
    className: PropTypes.string,
    onSelectAtom: PropTypes.func,
    molId: PropTypes.number,
}
