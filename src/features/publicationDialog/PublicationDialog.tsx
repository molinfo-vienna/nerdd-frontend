import { Publication } from "@/types"

import { useCallback, useState } from "react"
import Dialog from "../dialog/Dialog"
import PublicationCard from "./PublicationCard"

type PublicationDialogProps = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    publications?: Publication[]
}

export default function PublicationDialog({
    isOpen,
    setIsOpen,
    publications,
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
                publications={publications}
                style={selectedStyle}
                onSelectStyle={onSelectStyle}
            />
        </Dialog>
    )
}
