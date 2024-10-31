import PropTypes from "prop-types"
import React from "react"

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
    }

    if (resultProperty.type === "image") {
        return (
            <td {...commonProps}>
                <img width={350} height={150} src={value} />
            </td>
        )
    } else if (resultProperty.type === "text") {
        if (compressed) {
            return (
                <td {...commonProps}>
                    <div
                        style={{
                            maxWidth: "300px",
                            height: "25px",
                            // maxHeight: "25px",
                            // overflow: "scroll",
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
                {value !== undefined ? value.toFixed(precision) : ""}
            </td>
        )
    } else if (resultProperty.type === "integer") {
        return <td {...commonProps}>{value}</td>
    } else if (resultProperty.type === "boolean") {
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
