import FileUploadAndList from "@/features/fileUpload/FileUploadAndList"
import { type File } from "@/features/fileUpload/fileFieldSlice"
import { type FieldRenderProps } from "react-final-form"
import { useTooltipPositionReference } from "./TooltipPositionReferenceContext"

type FileFieldProps = FieldRenderProps<File[]>

export default function FileField({ input, meta }: FileFieldProps) {
    const tooltipPositionReference = useTooltipPositionReference()

    return (
        <FileUploadAndList
            input={input}
            meta={meta}
            name="inputFile"
            tooltipPositionReference={tooltipPositionReference}
        />
    )
}
