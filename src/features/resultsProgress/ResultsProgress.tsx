import { useGetJobQueueStatsQuery } from "@/services"
import { Job, Module } from "@/types"
import { useEffect, useState } from "react"

type ResultsProgressProps = {
    module: Module
    job: Job
}

function pluralize(count: number, singular: string, plural: string) {
    return count === 1 ? singular : plural
}

function formatTime(totalSeconds: number) {
    const totalMinutes = Math.floor(totalSeconds / 60)
    const totalHours = Math.floor(totalMinutes / 60)
    const days = Math.floor(totalHours / 24)

    const seconds = totalSeconds % 60
    const minutes = totalMinutes % 60
    const hours = totalHours % 24

    if (days > 0) {
        return `${days} ${pluralize(days, "day", "days")}, ${hours} ${pluralize(hours, "hour", "hours")}`
    } else if (totalHours > 0) {
        return `${totalHours} ${pluralize(totalHours, "hour", "hours")}, ${minutes} ${pluralize(
            minutes,
            "minute",
            "minutes",
        )}`
    } else if (totalMinutes > 0) {
        return `${totalMinutes} ${pluralize(totalMinutes, "minute", "minutes")}, ${seconds} ${pluralize(
            seconds,
            "second",
            "seconds",
        )}`
    } else {
        return `${totalSeconds} ${pluralize(totalSeconds, "second", "seconds")}`
    }
}

export default function ResultsProgress({ module, job }: ResultsProgressProps) {
    const { data, isLoading, error } = useGetJobQueueStatsQuery(job.id)

    const [timePassedSeconds, setTimePassedSeconds] = useState(0)

    let progressText
    if (isLoading) {
        progressText = <span>Fetching job status...</span>
    } else if (error || data == null) {
        progressText = (
            <span>Error fetching job status. Try refreshing the page."</span>
        )
    } else if (data.numActiveJobs === 0) {
        const firstBatchSize =
            job.numEntriesTotal ??
            Math.min(module.batchSize, job.numEntriesTotal)
        const timeToFirstResultsSeconds =
            firstBatchSize ??
            Math.max(
                module.startupTimeSeconds +
                    firstBatchSize * module.secondsPerMolecule,
                -timePassedSeconds,
                60,
            )

        let timeToFirstResultsText
        if (
            timeToFirstResultsSeconds == null ||
            timeToFirstResultsSeconds <= 60
        ) {
            timeToFirstResultsText = <>soon</>
        } else if (timeToFirstResultsSeconds < 120) {
            timeToFirstResultsText = (
                <>
                    in less than{" "}
                    <span className="text-primary fw-bold">
                        {formatTime(timeToFirstResultsSeconds)}
                    </span>
                </>
            )
        }
        progressText = (
            <>
                The job is next in the queue. The first results should appear{" "}
                {timeToFirstResultsText}.
            </>
        )
    } else {
        const waitingTimeSeconds =
            data.waitingTimeMinutes * 60 - timePassedSeconds
        const precisionNumActiveJobs =
            data.estimate === "lower_bound" ? "> " : ""
        const precisionWaitingTime =
            data.estimate === "lower_bound" ? "> " : "approximately "
        const url = `${window.location.origin}/${module.id}/${job.id}`

        progressText = (
            <span>
                The submitted job is currently at{" "}
                <span className="text-primary fw-bold">
                    position {precisionNumActiveJobs}
                    {data.numActiveJobs + 1}
                </span>{" "}
                in the queue and the estimated waiting time is{" "}
                {precisionWaitingTime}
                <span className="text-primary fw-bold">
                    {formatTime(waitingTimeSeconds)}
                </span>
                . You can navigate away from the page and come back later to
                monitor the job's progress using this link: <br />
                <a href={url}>{url}</a>.
            </span>
        )
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimePassedSeconds((prev) => prev + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="row justify-content-center">
            <div className="col-auto col-md-4 mt-5 pt-5 text-center">
                <div className="mt-2">{progressText}</div>
            </div>
        </div>
    )
}
