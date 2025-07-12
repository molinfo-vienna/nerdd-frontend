import { useAppDispatch } from "@/app/hooks"
import {
    addMolecule,
    addOutputFile,
    setNumEntriesTotal,
    updateJob,
} from "@/features/debug/debugSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { makeButton, useTweaks } from "use-tweaks"

type ResultsGeneratorProps = {
    job: {
        id: string
        moduleId: string
    }
    predictionSpeed: number
}

export default function ResultsGenerator({
    job,
    predictionSpeed,
}: ResultsGeneratorProps) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useTweaks("Jobs", {
        ...makeButton(`Goto job ${job.id}`, () =>
            navigate(`${job.moduleId}/${job.id}`),
        ),
    })

    // increment the number of molecules for all jobs
    useEffect(() => {
        if (predictionSpeed === 0) {
            return
        }

        // if the job is completed, this useEffect will trigger (because job.status is updated)
        // -> the old useEffect call will be disposed and the old timer will be cleared
        // -> then, useEffect will be called again with job.status = "completed"
        // -> returning here will prevent adding more molecules
        if (job.status === "completed") {
            // if the job is already completed, do not add more molecules
            return
        }

        const frequency = Math.max(1, Math.ceil(1000 / predictionSpeed))

        const timer = setInterval(
            () => dispatch(addMolecule(job.id)),
            frequency,
        )
        return () => clearInterval(timer)
    }, [dispatch, predictionSpeed, job.id, job.status])

    // numEntriesTotal is computed in parallel to the prediction
    // -> emulate this by setting it after a delay
    useEffect(() => {
        // 30 seconds
        const timer = setTimeout(() => {
            dispatch(
                setNumEntriesTotal({
                    jobId: job.id,
                }),
            )
        }, 30000)

        return () => clearTimeout(timer)
    }, [dispatch, job.id])

    // simulate adding output files
    useEffect(() => {
        if (job.numEntriesProcessed === job.numEntriesTotal) {
            // add output files with delay
            setTimeout(() => {
                dispatch(
                    addOutputFile({
                        jobId: job.id,
                        format: "sdf",
                        url: "http://some_url.sdf",
                    }),
                )
            }, 3000)

            setTimeout(() => {
                dispatch(
                    addOutputFile({
                        jobId: job.id,
                        format: "csv",
                        // deliberately use a different protocol (https) here to see what happens
                        url: "https://some_url.csv",
                    }),
                )
            }, 7000)

            return
        }
    }, [dispatch, job.id, job.numEntriesProcessed, job.numEntriesTotal])

    // simulate job completion
    useEffect(() => {
        if (job.outputFiles.length >= 2) {
            dispatch(
                updateJob({
                    jobId: job.id,
                    status: "completed",
                }),
            )
        }
    }, [dispatch, job.id, job.outputFiles.length])

    return null
}
