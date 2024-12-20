import React from "react"
import FileFieldAndList from "../fileUpload/FileFieldAndList"

export default function FileField({
    input,
    meta,
    positionReference,
    ...props
}) {
    return (
        <FileFieldAndList
            name="inputFile"
            tooltipPositionReference={positionReference}
            {...input}
            {...props}
        />
    )
}
