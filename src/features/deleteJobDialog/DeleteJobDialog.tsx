import { useDeleteJobMutation } from "@/services"
import { Modal } from "bootstrap"
import classNames from "classnames"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type DeleteJobDialogProps = {
    moduleId: string
    jobId: string
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export default function DeleteJobDialog({
    moduleId,
    jobId,
    isOpen,
    setIsOpen,
}: DeleteJobDialogProps) {
    const [deleteJob] = useDeleteJobMutation()
    const navigate = useNavigate()

    const [modal, setModal] = useState<Modal | null>(null)

    const ref = useCallback((node: HTMLDivElement | null) => {
        if (node) {
            // Initialize Bootstrap modal
            setModal((modal) => {
                if (modal != null) {
                    return modal
                }
                const newModal = new Modal(node, {
                    backdrop: "static",
                    keyboard: false,
                })
                return newModal
            })
        }
    }, [])

    useEffect(() => {
        if (modal) {
            if (isOpen) {
                modal.show()
            } else {
                modal.hide()
            }
        }
    }, [modal, isOpen])

    const [isLoading, setIsLoading] = useState(false)

    const handleAccept = useCallback(() => {
        setIsLoading(true)
        deleteJob({ moduleId, jobId }).then(({ data, error }) => {
            setIsLoading(false)
            setIsOpen(false)
            navigate("/")
        })
    }, [deleteJob, moduleId, jobId, setIsLoading, setIsOpen, navigate])

    return (
        <div
            className="modal fade"
            ref={ref}
            tabIndex={-1}
            aria-labelledby="deleteJobModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteJobModalLabel">
                            Delete Job
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setIsOpen(false)}
                        ></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this job?
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setIsOpen(false)}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleAccept}
                            disabled={isLoading}
                        >
                            <span
                                className={classNames({ invisible: isLoading })}
                            >
                                Delete
                            </span>
                            {isLoading && (
                                <span
                                    className="spinner-border spinner-border-sm position-absolute start-50 translate-middle"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
