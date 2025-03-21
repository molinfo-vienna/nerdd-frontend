import { useDropzone } from "react-dropzone"
import { PiFileArrowUp } from "react-icons/pi"
import "./style.scss"

type FileUploadProps = {
    name?: string
    onDrop?: (acceptedFiles: File[]) => void
    [key: string]: any
}

export default function FileUpload({
    name,
    onDrop,
    ...props
}: FileUploadProps) {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({ onDrop })

    let borderStyle
    if (isFocused) {
        borderStyle = "border-primary"
    } else if (isDragAccept) {
        borderStyle = "border-success text-success"
    } else if (isDragReject) {
        borderStyle = "border-danger"
    } else {
        borderStyle = "border-secondary text-muted"
    }

    const style = {
        className: `text-center rounded-2 fs-5 border-2 ${borderStyle} dropzone`,
    }

    return (
        <div {...getRootProps(style)}>
            <input name={name} {...getInputProps()} />
            <div className="m-5">
                <p className="mb-1">
                    <PiFileArrowUp size={48} />
                </p>
                <p className="m-0">
                    <span className="click-here">Click here</span> to upload
                    files or drag and drop.
                </p>
            </div>
        </div>
    )
}
