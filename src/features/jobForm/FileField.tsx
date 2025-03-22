import { type RefObject } from "react"
import { type FieldRenderProps } from "react-final-form"
import FileUploadAndList from "../fileUpload/FileUploadAndList"

// Define type for the component props
type FileFieldProps = FieldRenderProps<string> & {
    positionReference: RefObject<HTMLElement>
}

export default function FileField({
    input,
    meta,
    positionReference,
}: FileFieldProps) {
    return (
        <FileUploadAndList
            name="inputFile"
            tooltipPositionReference={positionReference}
        />
    )
}
