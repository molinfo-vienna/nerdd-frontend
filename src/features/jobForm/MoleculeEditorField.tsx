import { type RefObject } from "react"
import { type FieldRenderProps } from "react-final-form"
import MoleculeEditor from "../moleculeEditor/MoleculeEditor"

type MoleculeEditorFieldProps = FieldRenderProps<string> & {
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
