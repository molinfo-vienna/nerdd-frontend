import PropTypes from "prop-types"
import React from "react"
import { refType } from "../../types"
import FileUploadAndList from "../fileUpload/FileUploadAndList"

export default function FileField({
    input,
    meta,
    positionReference,
    ...props
}) {
    return (
        <FileUploadAndList
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
