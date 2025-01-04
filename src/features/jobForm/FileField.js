import PropTypes from "prop-types"
import React from "react"
import { refType } from "../../types"
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

FileField.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    positionReference: refType,
}
