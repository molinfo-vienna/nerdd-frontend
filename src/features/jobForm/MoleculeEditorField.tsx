import MoleculeEditor from "@/features/moleculeEditor/MoleculeEditor"
import { type RefObject } from "react"
import { type FieldRenderProps } from "react-final-form"

type MoleculeEditorFieldProps = FieldRenderProps<string> & {
    positionReference?: RefObject<HTMLElement>
}

export default function MoleculeEditorField({
    input,
    meta,
    positionReference,
}: MoleculeEditorFieldProps) {
    // TODO: add positionReference
    return MoleculeEditor({
        value: input?.value,
        onChange: input?.onChange,
    })
}
