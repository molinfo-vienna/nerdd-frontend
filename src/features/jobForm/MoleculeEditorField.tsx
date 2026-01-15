import MoleculeEditor from "@/features/moleculeEditor/MoleculeEditor"
import { type FieldRenderProps } from "react-final-form"
import { useTooltipPositionReference } from "./TooltipPositionReferenceContext"

type MoleculeEditorFieldProps = FieldRenderProps<string>

export default function MoleculeEditorField({
    input,
}: MoleculeEditorFieldProps) {
    const tooltipPositionReference = useTooltipPositionReference()

    return (
        <div ref={tooltipPositionReference}>
            <MoleculeEditor value={input?.value} onChange={input?.onChange} />
        </div>
    )
}
