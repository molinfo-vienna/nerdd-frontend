import React from "react"
import { CircularProgressbar } from "react-circular-progressbar"

export default function ProgressBar({ numEntriesProcessed, numEntriesTotal }) {
    console.log("update", numEntriesProcessed, numEntriesTotal)

    const progressAvailable =
        numEntriesProcessed != undefined && numEntriesTotal != undefined

    const progress = progressAvailable
        ? numEntriesProcessed / numEntriesTotal
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
