import PropTypes from "prop-types"
import React from "react"
import { RxCross1 } from "react-icons/rx"

export default function TableCell({
    resultProperty,
    value,
    rowSpan = undefined,
    compressed = false,
    ...props
}) {
    const commonProps = {
        key: resultProperty.name,
        rowSpan,
        ...props,
        className: compressed ? "compressed align-middle" : "",
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
            return (
                <td
                    {...commonProps}
                    dangerouslySetInnerHTML={{ __html: value }}
                ></td>
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
    } else {
        return <td {...commonProps}>{value}</td>
    }
}

TableCell.propTypes = {
    resultProperty: PropTypes.object.isRequired,
    value: PropTypes.any,
    rowSpan: PropTypes.number,
    compressed: PropTypes.bool,
}
