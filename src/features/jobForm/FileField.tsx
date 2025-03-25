import FileUploadAndList from "@/features/fileUpload/FileUploadAndList"
import { type File } from "@/features/fileUpload/fileFieldSlice"
import { type RefObject } from "react"
import { type FieldRenderProps } from "react-final-form"

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
