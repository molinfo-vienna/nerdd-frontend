import { Modal } from "bootstrap"
import classNames from "classnames"
import { ReactNode, useCallback, useEffect, useState } from "react"

type DeleteJobDialogProps = {
    size: "sm" | "md" | "lg" | "xl"
    title: string
    backdrop?: boolean | "static"
    keyboard?: boolean
    showAcceptButton?: boolean
    acceptButtonStyle?: "danger" | "primary" | "secondary"
    acceptButtonLabel?: string
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    isLoading: boolean
    onAccept: () => void
    error?: string
    children: ReactNode
}

export default function Dialog({
    title,
    size = "md",
    backdrop = true,
    keyboard = true,
    showAcceptButton = true,
    acceptButtonStyle = "primary",
    acceptButtonLabel = "OK",
    isOpen,
    setIsOpen,
    isLoading,
    onAccept,
    error,
    children,
}: DeleteJobDialogProps) {
    const [modal, setModal] = useState<Modal | null>(null)

    const ref = useCallback(
        (node: HTMLDivElement | null) => {
            if (node) {
                // When clicking on the close button or outside the modal, bootstrap closes the
                // modal. We need to listen to this event in order to update our state accordingly.
                node.addEventListener("hidden.bs.modal", () => {
                    setIsOpen(false)
                })

                // Initialize Bootstrap modal
                setModal((modal) => {
                    if (modal != null) {
                        return modal
                    }
                    const newModal = new Modal(node, {
                        backdrop,
                        keyboard,
                    })
                    return newModal
                })
            }
        },
        [setIsOpen, setModal, backdrop, keyboard],
    )

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
            aria-labelledby="modal"
            aria-hidden="true"
        >
            <div
                className={classNames("modal-dialog", {
                    "modal-sm": size === "sm",
                    "modal-lg": size === "lg",
                    "modal-xl": size === "xl",
                })}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modal">
                            {title}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setIsOpen(false)}
                        ></button>
                    </div>
                    <div className="modal-body">{children}</div>
                    {error && (
                        <div className="modal-body">
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        </div>
                    )}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        {showAcceptButton && (
                            <button
                                type="button"
                                className={`btn position-relative btn-${acceptButtonStyle}`}
                                onClick={onAccept}
                                disabled={isLoading}
                            >
                                <span
                                    className={classNames({
                                        invisible: isLoading,
                                    })}
                                >
                                    {acceptButtonLabel}
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
