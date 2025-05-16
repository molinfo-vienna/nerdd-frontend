import { CircularProgressbar } from "react-circular-progressbar"

type ProgressBarProps = {
    numEntriesProcessed?: number
    numEntriesTotal?: number
}

export default function ProgressBar({
    numEntriesProcessed,
    numEntriesTotal,
}: ProgressBarProps) {
    const progressAvailable = numEntriesTotal != null

    const numEntriesProcessedModified = numEntriesProcessed ?? 0

    const progress = progressAvailable
        ? numEntriesProcessedModified / numEntriesTotal
        : 1

    const progressPercent = Math.round(progress * 1000) / 10

    return (
        <div
            className="mx-3"
            style={{
                width: "90px",
                height: "90px",
            }}
        >
            <CircularProgressbar
                value={progressAvailable ? progressPercent : 0}
                text={progressAvailable ? `${progressPercent}%` : ""}
                styles={{
                    text: {
                        fontWeight: "bold",
                    },
                }}
            />
        </div>
    )
}
