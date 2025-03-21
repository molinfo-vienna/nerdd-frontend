import { type RefObject } from "react"
import MoleculeEditor from "../moleculeEditor/MoleculeEditor"

type MoleculeEditorFieldProps = {
    input?: {
        value?: string
        onChange?: (value: string) => void
        [key: string]: any
    }
    meta?: {
        touched?: boolean
        error?: string
        [key: string]: any
    }
    positionReference?:
        | RefObject<HTMLElement>
        | ((instance: HTMLElement | null) => void)
}

export default function MoleculeEditorField({
    input,
    meta,
    positionReference,
}: MoleculeEditorFieldProps) {
    return MoleculeEditor({
        value: input?.value,
        onChange: input?.onChange,
    })
}
