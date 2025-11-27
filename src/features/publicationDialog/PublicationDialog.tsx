import { useCallback, useState } from "react"
import Dialog from "../dialog/Dialog"
import PublicationCard from "./PublicationCard"

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
            <PublicationCard
                moduleId={moduleId}
                style={selectedStyle}
                onSelectStyle={onSelectStyle}
            />
        </Dialog>
    )
}
