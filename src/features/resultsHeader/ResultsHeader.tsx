import { JobStatus, Module } from "@/types"
import ProgressBar from "../progressBar/ProgressBar"

type ResultsHeaderProps = {
    module: Module
    jobStatus: JobStatus
    children?: React.ReactNode
}

export default function ResultsHeader({
    module,
    jobStatus,
    children,
}: ResultsHeaderProps) {
    const statusText = `${jobStatus.numEntriesProcessed ?? 0} / ${jobStatus.numEntriesTotal ?? "?"} molecules processed`

    return (
        <section className="py-4 d-flex justify-content-center">
            <div className="d-block d-lg-flex flex-wrap">
                <div className="hstack pb-3">
                    {/* Progress bar */}
                    <ProgressBar
                        numEntriesProcessed={jobStatus.numEntriesProcessed}
                        numEntriesTotal={jobStatus.numEntriesTotal}
                    />
                    {/* Module name & status*/}
                    <div
                        className="d-flex flex-column justify-content-end py-2 me-5"
                        style={{
                            height: "90px",
                        }}
                    >
                        {/* mb-n1: use negative margin to compensate for font with excessive 
                            margin at the bottom */}
                        <h1 className="text-primary fw-bold my-auto mb-n1">
                            {module.visibleName}
                        </h1>
                        <span className="mb-1">{statusText}</span>
                    </div>
                </div>
                {/* Action buttons */}
                <div className="btn-group pb-3" role="group">
                    {children}
                </div>
            </div>
        </section>
    )
}
