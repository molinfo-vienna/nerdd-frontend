import PopUp from "@/features/popup/PopUp"
import { Job } from "@/types"
import { memo } from "react"
import { FaFileDownload } from "react-icons/fa"
import { FaFileLines } from "react-icons/fa6"
import { Link } from "react-router-dom"
import ActionButton from "./ActionButton"
import "./DownloadActionButton.css"

type DownloadActionButtonProps = {
    job: Job
    outputFormats: string[]
}

function DownloadActionButton({
    job,
    outputFormats,
}: DownloadActionButtonProps) {
    const outputFiles = job.outputFiles ?? []
    const outputFileItems = outputFormats.map((format) => {
        const fileFromStatus = outputFiles.find((f) => f.format == format)
        const status = fileFromStatus === undefined ? "disabled" : ""
        return {
            format,
            status,
            url: fileFromStatus?.url ?? "",
        }
    })

    const disabled = outputFiles.length == 0

    const button = (
        <div className="btn-group dropdown-center" role="group">
            <ActionButton
                label="Download"
                disabled={disabled}
                // dropdown
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
            >
                <ActionButton.Icon>
                    <FaFileDownload />
                </ActionButton.Icon>
            </ActionButton>
            <ul className="dropdown-menu" style={{ zIndex: 1030 }}>
                {outputFileItems.map((item) => (
                    <li key={item.format}>
                        <Link
                            className={`dropdown-item ${item.status}`}
                            to={item.url}
                            target="_blank"
                            download
                        >
                            <FaFileLines size={24} className="me-2" />
                            {item.format.toUpperCase()}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )

    if (disabled) {
        return (
            <PopUp
                text="Download available after job is completed"
                placement="bottom"
                className="tooltip-wrapper"
            >
                {button}
            </PopUp>
        )
    } else {
        return button
    }
}

export default memo(DownloadActionButton, (prev, next) => {
    return (
        prev.job.outputFiles.length === next.job.outputFiles.length &&
        prev.job.outputFiles.every((file, index) => {
            const nextFile = next.job.outputFiles[index]
            return (
                nextFile !== undefined &&
                file.format === nextFile.format &&
                file.url === nextFile.url
            )
        }) &&
        prev.outputFormats === next.outputFormats
    )
})
