import PropTypes from "prop-types"
import { refType } from "../../types"
import MoleculeEditor from "../moleculeEditor/MoleculeEditor"

export default function MoleculeEditorField({
    input,
    meta,
    positionReference,
    ...props
}) {
    return MoleculeEditor({ value: input.value, onChange: input.onChange })
}

MoleculeEditorField.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    positionReference: refType,
}
