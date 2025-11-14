import Tangle from "@/features/tangle/Tangle"
import { useGetModuleQueueStatsQuery } from "@/services"
import { type Module } from "@/types"
import { useState } from "react"
import {
    FaBook,
    FaBookOpen,
    FaClock,
    FaPlug,
    FaWeightScale,
} from "react-icons/fa6"
import { IoSpeedometer } from "react-icons/io5"
import Markdown from "react-markdown"
import HeaderLink from "../moduleHeader/HeaderLink"
import Tile from "./Tile"

type CreateJobHeaderProps = {
    module: Module
}

export default function CreateJobHeader({ module }: CreateJobHeaderProps) {
    const {
        data: queueStats,
        isLoading: isLoadingQueueStats,
        error,
    } = useGetModuleQueueStatsQuery(module.id)

    //
    // Estimate waiting time
    //
    const waitingTimeMinutes = queueStats?.waitingTimeMinutes
    const prefix = queueStats?.estimate === "upper_bound" ? "<" : ">"

    let waitingTimeText
    if (isLoadingQueueStats) {
        waitingTimeText = "loading"
    } else if (error || waitingTimeMinutes === undefined) {
        console.error("Error loading queue stats", error)
        waitingTimeText = "unknown"
    } else if (waitingTimeMinutes > 60) {
        const waitingTimeHours = Math.floor(waitingTimeMinutes / 60)
        const remainingMinutes = Math.round(waitingTimeMinutes % 60)
        waitingTimeText = `${prefix} ${waitingTimeHours}h, ${remainingMinutes}min`
    } else if (waitingTimeMinutes <= 1) {
        waitingTimeText = "< 1 min"
    } else {
        waitingTimeText = `${prefix} ${waitingTimeMinutes} min`
    }

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
            module.maxNumMolecules,
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
    const numberOfBatches = Math.ceil(
        numberOfMoleculesRounded / module.batchSize,
    )
    const processingTimeSeconds =
        numberOfMoleculesRounded * module.secondsPerMolecule +
        numberOfBatches * module.startupTimeSeconds

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

    // Notes about the responsive design:
    // * Header:
    //   * consists of two parts: (1) title & description and (2) info card
    //
    // * Info card:
    //   * Small screens (Smartphone): list of links below title and description
    //   * Medium screens (Tablet sideways): column on the right side
    //   * Large screens (Desktop): same as medium screens
    return (
        <section className="container py-5">
            <div className="row justify-content-center pb-3">
                <div className="col col-lg-8 col-xl-6">
                    <h2 className="pb-3">
                        <span className="text-primary fw-bold">
                            {module.visibleName}
                            {module.title ? ": " : ""}
                        </span>
                        {module.title}
                    </h2>
                    <Markdown className="lead">{module.description}</Markdown>
                    {/* Info card as list of links */}
                    <div>
                        <HeaderLink
                            Icon={FaBookOpen}
                            href={`/${module.id}/about`}
                            caption="Docs"
                        />
                        <HeaderLink
                            Icon={FaPlug}
                            href={`/${module.id}/api`}
                            caption="API"
                        />
                        <HeaderLink
                            Icon={FaBook}
                            href={`/${module.id}/cite`}
                            caption="Cite"
                        />
                    </div>
                </div>
                {/* Info card as column on large screens */}
                <div
                    // d-none d-lg-block: show this column only on large screens
                    // ps-xl-5: add padding on the left side for very large screens
                    // align-content-center: center the content vertically
                    className="col-4 d-none d-lg-block ps-xl-5 align-content-center"
                >
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <Tile>
                                <Tile.Icon>
                                    <FaWeightScale size={50} />
                                </Tile.Icon>
                                <Tile.Highlight>
                                    {module.maxNumMolecules} molecules
                                </Tile.Highlight>
                                <Tile.Label>Maximum job size</Tile.Label>
                            </Tile>
                            <Tile>
                                <Tile.Icon>
                                    <FaClock size={50} />
                                </Tile.Icon>
                                <Tile.Highlight>
                                    {isLoadingQueueStats ? (
                                        <span className="placeholder">
                                            10h, 50min
                                        </span>
                                    ) : (
                                        waitingTimeText
                                    )}
                                </Tile.Highlight>
                                <Tile.Label>Estimated time in queue</Tile.Label>
                            </Tile>
                            <Tile>
                                <Tile.Icon>
                                    <IoSpeedometer size={50} />
                                </Tile.Icon>
                                <Tile.Highlight>
                                    {processingTimeText} for{" "}
                                    <Tangle
                                        initialValue={numberOfMolecules}
                                        min={1}
                                        max={module.maxNumMolecules}
                                        setValue={setNumberOfMolecules}
                                    >
                                        {numberOfMoleculesText}
                                    </Tangle>
                                </Tile.Highlight>
                                <Tile.Label>
                                    Estimated processing time
                                </Tile.Label>
                            </Tile>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
