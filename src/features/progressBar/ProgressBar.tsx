import classNames from "classnames"
import { CircularProgressbar } from "react-circular-progressbar"
import "./style.css"

type ProgressBarProps = {
    value?: number
    max?: number
    width?: number | string
    height?: number | string
    strokeWidth?: number
    className?: string
    showText?: boolean
}

export default function ProgressBar({
    value,
    max,
    width = 90,
    height = 90,
    strokeWidth = 8,
    className,
    showText = true,
}: ProgressBarProps) {
    const progressAvailable = max != null && max > 0
    const normalizedValue = value ?? 0

    const progress = progressAvailable ? normalizedValue / max : 1
    const progressPercent = Math.round(progress * 1000) / 10

    return (
        <div
            className={classNames(className)}
            style={{
                width,
                height,
            }}
        >
            <CircularProgressbar
                value={progressAvailable ? progressPercent : 0}
                text={
                    showText && progressAvailable ? `${progressPercent}%` : ""
                }
                strokeWidth={strokeWidth}
                styles={{
                    text: {
                        fontWeight: "bold",
                    },
                }}
            />
        </div>
    )
}
