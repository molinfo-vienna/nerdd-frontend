import { useAppDispatch } from "@/app/hooks"
import { addMolecule, setNumEntriesTotal } from "@/features/debug/debugSlice"
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

        const frequency = Math.max(1, Math.ceil(1000 / predictionSpeed))

        const timer = setInterval(
            () => dispatch(addMolecule(job.id)),
            frequency,
        )
        return () => clearInterval(timer)
    }, [dispatch, predictionSpeed, job.id])

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

    return null
}
