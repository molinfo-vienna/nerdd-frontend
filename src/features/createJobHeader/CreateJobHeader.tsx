import Tangle from "@/features/tangle/Tangle"
import { type Module } from "@/types"
import { useState, type ComponentType } from "react"
import {
    FaBook,
    FaBookOpen,
    FaClock,
    FaPlug,
    FaWeightScale,
} from "react-icons/fa6"
import { IoSpeedometer } from "react-icons/io5"
import Markdown from "react-markdown"
import { Link } from "react-router-dom"
import Tile from "./Tile"

type CreateJobHeaderProps = {
    module: Module
}

type IconItem = {
    Icon: ComponentType<{ size?: number }>
    caption: string
    href?: string
}

export default function CreateJobHeader({ module }: CreateJobHeaderProps) {
    const icons: IconItem[] = [
        {
            Icon: FaBookOpen,
            caption: "Docs",
            href: `/${module.id}/about`,
        },
        {
            Icon: FaPlug,
            caption: "API",
            href: `/${module.id}/api`,
        },
        {
            Icon: FaBook,
            caption: "Cite",
            href: `/${module.id}/cite`,
        },
    ]

    //
    // Estimate waiting time
    //
    const waitingTimeMinutes = 1

    let waitingTimeText
    if (waitingTimeMinutes <= 1) {
        waitingTimeText = "< 1 min"
    } else {
        waitingTimeText = `${waitingTimeMinutes} min`
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
        const hours = Math.floor(processingTimeSeconds / (60 * 60))
        processingTimeText = `${hours} h`
    } else if (processingTimeSeconds > 60) {
        // more than 1 minute -> show minutes
        const minutes = Math.floor(processingTimeSeconds / 60)
        processingTimeText = `${minutes} min`
    } else if (processingTimeSeconds > 1) {
        // more than 1 second -> show seconds
        const seconds = Math.floor(processingTimeSeconds)
        processingTimeText = `${seconds} s`
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
                    <div
                        // d-block d-lg-none: show the list of links only on small screens
                        className="d-block d-lg-none"
                    >
                        {icons.map((icon, index) =>
                            icon.href !== undefined ? (
                                <Link
                                    key={index}
                                    className="text-decoration-none my-auto me-4"
                                    to={icon.href}
                                >
                                    <icon.Icon size={15} />
                                    <span className="ms-1">{icon.caption}</span>
                                </Link>
                            ) : (
                                <div className="my-auto d-block">
                                    {icon.caption}
                                </div>
                            ),
                        )}
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
                                    <FaWeightScale size={60} />
                                </Tile.Icon>
                                <Tile.Highlight>
                                    {module.maxNumMolecules} molecules
                                </Tile.Highlight>
                                <Tile.Label>Maximum job size</Tile.Label>
                            </Tile>
                            <Tile>
                                <Tile.Icon>
                                    <FaClock size={60} />
                                </Tile.Icon>
                                <Tile.Highlight>
                                    {waitingTimeText}
                                </Tile.Highlight>
                                <Tile.Label>Estimated time in queue</Tile.Label>
                            </Tile>
                            <Tile>
                                <Tile.Icon>
                                    <IoSpeedometer size={60} />
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
