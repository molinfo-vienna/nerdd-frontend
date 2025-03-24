import { type RefObject } from "react"
import { type FieldRenderProps } from "react-final-form"
import FileUploadAndList from "../fileUpload/FileUploadAndList"
import { type File } from "../fileUpload/fileFieldSlice"

// Define type for the component props
type FileFieldProps = FieldRenderProps<File[]> & {
    positionReference?: RefObject<HTMLElement>
}

export default function FileField({
    input,
    meta,
    positionReference,
}: FileFieldProps) {
    return (
        <FileUploadAndList
            input={input}
            meta={meta}
            name="inputFile"
            tooltipPositionReference={positionReference}
        />
    )
}
