import Tooltip from "@/features/tooltip/Tooltip"
import { JobStatus } from "@/types"
import { FaFileDownload } from "react-icons/fa"
import { FaFileLines } from "react-icons/fa6"
import { Link } from "react-router-dom"
import ActionButton from "./ActionButton"
import "./DownloadActionButton.css"

type DownloadActionButtonProps = {
    jobStatus: JobStatus
}

export default function DownloadActionButton({
    jobStatus,
}: DownloadActionButtonProps) {
    const outputFormats = ["sdf", "csv"]

    const outputFileItems = outputFormats.map((format) => {
        const fileFromStatus = (jobStatus.outputFiles ?? []).find(
            (f) => f.format == format,
        )
        const status = fileFromStatus === undefined ? "disabled" : ""
        return {
            format,
            status,
            url: fileFromStatus?.url ?? "",
        }
    })

    const disabled =
        jobStatus.outputFiles === undefined || jobStatus.outputFiles.length == 0

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
            <Tooltip
                text="Download available after job is completed"
                placement="bottom"
                className="tooltip-wrapper"
            >
                {button}
            </Tooltip>
        )
    } else {
        return button
    }
}
