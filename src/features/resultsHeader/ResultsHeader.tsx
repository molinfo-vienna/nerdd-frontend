import ProgressBar from "@/features/progressBar/ProgressBar"
import { Job, Module } from "@/types"

type ResultsHeaderProps = {
    module: Module
    job: Job
    children?: React.ReactNode
}

export default function ResultsHeader({
    module,
    job,
    children,
}: ResultsHeaderProps) {
    const statusText = `${job.numEntriesProcessed ?? 0} / ${job.numEntriesTotal ?? "?"} molecules processed`

    return (
        <section className="d-flex justify-content-center py-4">
            {/*
             * Main idea:
             * - d-lg-flex is used to align the content in a row on large screens
             * - for small screens we use plain block (d-block) elements so the browser will
             *   wrap content, but also align everything to the left
             * - the encompassing section is centered, so the content block itself is centered
             */}
            <div className="d-block d-lg-flex">
                <div
                    // mx-1 for a small margin on small screens
                    // mx-sm-3 to put the progress bar roughly above the first icon on large screens
                    className="hstack pb-3 mx-1 mx-sm-3"
                >
                    {/* Progress bar */}
                    <ProgressBar
                        numEntriesProcessed={job.numEntriesProcessed}
                        numEntriesTotal={job.numEntriesTotal}
                    />
                    {/* Module name & status */}
                    <div className="d-flex flex-column py-3 me-lg-3">
                        {/* mb-n1: use negative margin to compensate for font with excessive 
                            margin at the bottom */}
                        <h1 className="text-primary fw-bold my-auto mb-n1">
                            {module.visibleName}
                        </h1>
                        <span className="mb-1">{statusText}</span>
                    </div>
                </div>
                {/* Action buttons */}
                <div className="btn-group pb-3 mx-3" role="group">
                    {children}
                </div>
            </div>
        </section>
    )
}
