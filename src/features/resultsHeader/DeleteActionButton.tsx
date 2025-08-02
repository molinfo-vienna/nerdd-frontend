import DeleteJobDialog from "@/features/deleteJobDialog/DeleteJobDialog"
import { useDeleteJobMutation } from "@/services"
import { memo, useCallback, useState } from "react"
import { createPortal } from "react-dom"
import { FaTrash } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import ActionButton from "./ActionButton"

type DeleteActionButtonProps = {
    moduleId: string
    jobId: string
}

function DeleteActionButton({ moduleId, jobId }: DeleteActionButtonProps) {
    const [deleteJob] = useDeleteJobMutation()

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleAccept = useCallback(() => {
        setIsLoading(true)
        setError(null)
        deleteJob({ moduleId, jobId }).then(({ error }) => {
            setIsLoading(false)

            if (error) {
                console.error("Failed to delete job:", error)
                setError("Failed to delete job. Please try again later.")
            } else {
                setIsOpen(false)
                setTimeout(() => navigate("/"), 500)
            }
        })
    }, [deleteJob, moduleId, jobId, setIsLoading, setIsOpen, navigate])

    return (
        <>
            <ActionButton
                label="Delete"
                style="danger"
                onClick={() => setIsOpen(true)}
            >
                <ActionButton.Icon>
                    <FaTrash />
                </ActionButton.Icon>
            </ActionButton>
            {/* Render the modal in the body (because a modal would not render correctly here) */}
            {createPortal(
                <DeleteJobDialog
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    isLoading={isLoading}
                    onAccept={handleAccept}
                    error={error}
                />,
                document.body,
            )}
        </>
    )
}

export default memo(DeleteActionButton)
