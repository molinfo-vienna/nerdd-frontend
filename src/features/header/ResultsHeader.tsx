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
                    <div className="vstack p-2 me-5">
                        <div
                            style={{ height: "50px" }}
                            className="d-none d-md-block"
                        >
                            <h1 className="text-primary fw-bold my-auto">
                                {module.visibleName}
                            </h1>
                        </div>
                        <div
                            style={{ height: "30px" }}
                            className="d-md-none d-xs-block"
                        >
                            <h1 className="text-primary fw-bold my-auto">
                                {module.visibleName}
                            </h1>
                        </div>
                        <div style={{ height: "20px" }}>
                            <p className="mb-0">{statusText}</p>
                        </div>
                    </div>
                </div>
                {/* Action buttons */}
                <div className="pb-3 btn-group" role="group">
                    {children}
                </div>
            </div>
        </section>
    )
}
