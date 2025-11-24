import Dialog from "../dialog/Dialog"

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
    return (
        <Dialog
            title="Delete Job"
            acceptButtonLabel="Delete"
            acceptButtonStyle="danger"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isLoading={isLoading}
            onAccept={onAccept}
            error={error ?? undefined}
        >
            Are you sure you want to delete this job?
        </Dialog>
    )
}
