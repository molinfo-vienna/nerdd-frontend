import classNames from "classnames"
import { useDropzone } from "react-dropzone"
import { PiFileArrowUp } from "react-icons/pi"
import "./style.scss"

type FileUploadProps = {
    name?: string
    onDrop?: (acceptedFiles: File[]) => void
}

export default function FileUpload({ name, onDrop }: FileUploadProps) {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({ onDrop })

    const style = {
        className: classNames("text-center rounded-2 fs-5 border-2 dropzone", {
            "border-primary": isFocused,
            "border-success text-success": isDragAccept,
            "border-danger": isDragReject,
            "border-secondary text-muted":
                !isFocused && !isDragAccept && !isDragReject,
        }),
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
