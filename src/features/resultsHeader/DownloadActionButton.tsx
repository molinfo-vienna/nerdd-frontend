import PopUp from "@/features/popup/PopUp"
import { JobStatus } from "@/types"
import { memo } from "react"
import { FaFileDownload } from "react-icons/fa"
import { FaFileLines } from "react-icons/fa6"
import { Link } from "react-router-dom"
import ActionButton from "./ActionButton"
import "./DownloadActionButton.css"

type DownloadActionButtonProps = {
    jobStatus: JobStatus
    outputFormats: string[]
}

function DownloadActionButton({
    jobStatus,
    outputFormats,
}: DownloadActionButtonProps) {
    const outputFiles = jobStatus.outputFiles ?? []
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
        <ActionButton label="Download" disabled={disabled}>
            <ActionButton.Icon>
                <FaFileDownload />
            </ActionButton.Icon>
            <ActionButton.Dropdown>
                <ul className="dropdown-menu">
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
            </ActionButton.Dropdown>
        </ActionButton>
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
        prev.jobStatus.outputFiles.length ===
            next.jobStatus.outputFiles.length &&
        prev.jobStatus.outputFiles.every((file, index) => {
            const nextFile = next.jobStatus.outputFiles[index]
            return (
                nextFile !== undefined &&
                file.format === nextFile.format &&
                file.url === nextFile.url
            )
        }) &&
        prev.outputFormats === next.outputFormats
    )
})
