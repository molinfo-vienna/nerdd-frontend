import { Modal } from "bootstrap"
import classNames from "classnames"
import { useCallback, useEffect, useState } from "react"

type DeleteJobDialogProps = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    isLoading: boolean
    onAccept: () => void
    error: string | null
}

export default function DeleteJobDialog({
    isOpen,
    setIsOpen,
    isLoading,
    onAccept,
    error,
}: DeleteJobDialogProps) {
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
                        {error && (
                            <div
                                className="alert alert-danger mt-3"
                                role="alert"
                            >
                                {error}
                            </div>
                        )}
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
                            className="btn btn-danger position-relative"
                            onClick={onAccept}
                            disabled={isLoading}
                        >
                            <span
                                className={classNames({ invisible: isLoading })}
                            >
                                Delete
                            </span>
                            {isLoading && (
                                <div className="position-absolute top-50 start-50 translate-middle">
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </span>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
