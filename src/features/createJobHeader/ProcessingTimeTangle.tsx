import Tangle from "@/features/tangle/Tangle"
import { memo, useState } from "react"

type ProcessingTimeTangleProps = {
    maxNumMolecules: number
    batchSize: number
    secondsPerMolecule: number
    startupTimeSeconds: number
}

const ProcessingTimeTangle = memo(function ProcessingTimeTangle({
    maxNumMolecules,
    batchSize,
    secondsPerMolecule,
    startupTimeSeconds,
}: ProcessingTimeTangleProps) {
    //
    // Estimate processing time
    //
    const [numberOfMolecules, setNumberOfMolecules] = useState(10)

    // always show meaningful molecule numbers to the user
    // 12345 -> 12000
    // 1234 -> 1200
    // 123 -> 120
    // 12 -> 12
    let numberOfMoleculesRounded
    if (numberOfMolecules < 100) {
        numberOfMoleculesRounded = Math.round(numberOfMolecules)
    } else {
        const numberOfDigits = Math.floor(Math.log10(numberOfMolecules))
        const factor = Math.pow(10, numberOfDigits - 1)
        numberOfMoleculesRounded =
            Math.round(numberOfMolecules / factor) * factor

        // make sure that we never display a number larger than the maximum (it's confusing)
        numberOfMoleculesRounded = Math.min(
            numberOfMoleculesRounded,
            maxNumMolecules,
        )
    }

    let numberOfMoleculesText
    if (numberOfMolecules == 1) {
        numberOfMoleculesText = "1 molecule"
    } else if (numberOfMoleculesRounded < 1000) {
        numberOfMoleculesText = `${numberOfMoleculesRounded} molecules`
    } else if (numberOfMoleculesRounded < 1_000_000) {
        numberOfMoleculesText = `${(numberOfMoleculesRounded / 1000).toFixed(1)}k molecules`
    }

    //
    // displaying the processing time
    //
    const numberOfBatches = Math.ceil(numberOfMoleculesRounded / batchSize)
    const processingTimeSeconds =
        numberOfMoleculesRounded * secondsPerMolecule +
        numberOfBatches * startupTimeSeconds

    // format the processing time
    let processingTimeText
    if (processingTimeSeconds > 48 * 60 * 60) {
        // more than 48 hours -> show days
        const days = Math.round(processingTimeSeconds / (24 * 60 * 60))
        processingTimeText = `${days} days`
    } else if (processingTimeSeconds > 60 * 60) {
        // more than 1 hour -> show hours
        const hours = Math.round(processingTimeSeconds / (60 * 60))
        processingTimeText = `${hours}h`
    } else if (processingTimeSeconds > 60) {
        // more than 1 minute -> show minutes
        const minutes = Math.round(processingTimeSeconds / 60)
        processingTimeText = `${minutes}min`
    } else if (processingTimeSeconds > 1) {
        // more than 1 second -> show seconds
        const seconds = Math.round(processingTimeSeconds)
        processingTimeText = `${seconds}s`
    } else {
        // less than 1 second -> show "< 1s"
        processingTimeText = `< 1s`
    }

    return (
        <>
            {processingTimeText} for{" "}
            <Tangle
                initialValue={numberOfMolecules}
                min={1}
                max={maxNumMolecules}
                setValue={setNumberOfMolecules}
            >
                {numberOfMoleculesText}
            </Tangle>
        </>
    )
})

export default ProcessingTimeTangle
