import { lazy, Suspense, useCallback, useState } from "react"
import Dialog from "../dialog/Dialog"

type PublicationDialogProps = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    moduleId?: string
}

export default function PublicationDialog({
    isOpen,
    setIsOpen,
    moduleId,
}: PublicationDialogProps) {
    const PublicationCard = lazy(() => import("./PublicationCard"))
    const [selectedStyle, setSelectedStyle] = useState("apa")

    const onSelectStyle = useCallback(
        (style: string) => {
            setSelectedStyle(style)
        },
        [setSelectedStyle],
    )

    return (
        <Dialog
            title="Export publications"
            size="lg"
            showAcceptButton={false}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isLoading={false}
            onAccept={() => {}}
        >
            <Suspense
                fallback={
                    <div className="d-flex justify-content-center py-4">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
            >
                <PublicationCard
                    moduleId={moduleId}
                    style={selectedStyle}
                    onSelectStyle={onSelectStyle}
                />
            </Suspense>
        </Dialog>
    )
}
