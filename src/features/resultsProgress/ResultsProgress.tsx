import { useGetJobQueueStatsQuery } from "@/services"
import { Job, Module } from "@/types"
import { memo, useEffect, useState } from "react"

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

    if (days > 0) {
        const hours = totalHours % 24
        return `${days} ${pluralize(days, "day", "days")}, ${hours} ${pluralize(hours, "hour", "hours")}`
    } else if (totalHours > 0) {
        const minutes = totalMinutes % 60
        return `${totalHours} ${pluralize(totalHours, "hour", "hours")}, ${minutes} ${pluralize(
            minutes,
            "minute",
            "minutes",
        )}`
    } else if (totalSeconds > 60) {
        const seconds = totalSeconds % 60
        return `${totalMinutes} ${pluralize(totalMinutes, "minute", "minutes")}, ${seconds} ${pluralize(
            seconds,
            "second",
            "seconds",
        )}`
    } else {
        return `one minute`
    }
}

function ResultsProgress({ module, job }: ResultsProgressProps) {
    const { data, isLoading, error } = useGetJobQueueStatsQuery(job.id, {
        // get a new estimate every five minutes (300000 milliseconds)
        pollingInterval: 300000,
    })

    const [timePassedSeconds, setTimePassedSeconds] = useState(0)

    useEffect(() => {
        setTimePassedSeconds(0)
    }, [data?.waitingTimeMinutes])

    let progressText
    if (job.numEntriesProcessed > 0) {
        progressText = <span>Fetching results...</span>
    } else if (isLoading) {
        progressText = <span>Fetching job status...</span>
    } else if (error || data == null) {
        progressText = (
            <span>Error fetching job status. Try refreshing the page.</span>
        )
    } else if (data.numActiveJobs === 0) {
        // job is currently not waiting in the queue and already being processed

        // compute the time until first batch is done
        const firstBatchSize =
            job.numEntriesTotal == null
                ? undefined
                : Math.min(module.batchSize, job.numEntriesTotal)
        const timeToFirstResultsSeconds =
            firstBatchSize == null
                ? undefined
                : Math.max(
                      // get a valid integer number of seconds (ceil)
                      // module needs to start up (startupTimeSeconds)
                      // then it needs to process the first batch (firstBatchSize * secondsPerMolecule)
                      // subtract the time that has already passed (timePassedSeconds)
                      Math.ceil(
                          module.startupTimeSeconds +
                              firstBatchSize * module.secondsPerMolecule -
                              timePassedSeconds,
                      ),
                      60,
                  )

        let timeToFirstResultsText
        if (timeToFirstResultsSeconds == null) {
            timeToFirstResultsText = <>soon</>
        } else {
            timeToFirstResultsText = (
                <>
                    in approximately{" "}
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
        // job is waiting in the queue

        // compute the waiting time
        const waitingTimeSeconds = Math.ceil(
            data.waitingTimeMinutes * 60 - timePassedSeconds,
        )

        // consider if the provided value from the server is a lower bound
        const precisionNumActiveJobs =
            data.estimate === "lower_bound" ? "> " : ""
        const precisionWaitingTime =
            data.estimate === "lower_bound" ? "> " : "approximately "

        // construct a URL that can be used to return to this page
        const url = `${window.location.origin}/${module.id}/${job.id}`

        progressText = (
            <span>
                The submitted job is currently at{" "}
                <span className="text-primary fw-bold">
                    position {precisionNumActiveJobs}
                    {data.numActiveJobs + 1}
                </span>{" "}
                in the queue and the waiting time is {precisionWaitingTime}
                <span className="text-primary fw-bold">
                    {formatTime(waitingTimeSeconds)}
                </span>
                . You can navigate away from the page and come back later to
                monitor the job's progress by using this link: <br />
                <a href={url}>{url}</a>.
            </span>
        )
    }

    // Update time passed every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTimePassedSeconds((prev) => prev + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [setTimePassedSeconds])

    return (
        <div className="row justify-content-center">
            <div className="col-auto col-md-5 mt-5 pt-5 text-center">
                <div className="mt-2">{progressText}</div>
            </div>
        </div>
    )
}

export default memo(ResultsProgress)
