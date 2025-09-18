import { ResultProperty } from "@/types"
import { memo } from "react"
import { FaPalette } from "react-icons/fa6"
import { AugmentedResultPropertyGroup } from "../resultTable/resultTableSlice"
import ActionButton from "./ActionButton"
import ColorSelectDropdown from "./ColorSelectDropdown"

type ColorSelectActionButtonProps = {
    atomColorProperty?: ResultProperty
    possibleAtomColorProperties: ResultProperty[]
    onAtomColorPropertyChange: (property?: ResultProperty) => void
    resultPropertyGroups: AugmentedResultPropertyGroup[]
    onColorColumnToggle: (propertyName: string, colored: boolean) => void
    onColorGroupToggle: (groupName: string, colored: boolean) => void
}

function ColorSelectActionButton({
    atomColorProperty,
    possibleAtomColorProperties,
    onAtomColorPropertyChange,
    resultPropertyGroups,
    onColorColumnToggle,
    onColorGroupToggle,
}: ColorSelectActionButtonProps) {
    return (
        <div className="btn-group dropdown-center" role="group">
            <ActionButton
                label="Colors"
                // dropdown
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
            >
                <ActionButton.Icon>
                    <FaPalette />
                </ActionButton.Icon>
            </ActionButton>
            <ColorSelectDropdown
                selectedAtomColorProperty={atomColorProperty}
                possibleAtomColorProperties={possibleAtomColorProperties}
                onSelectedAtomColorPropertyChange={onAtomColorPropertyChange}
                resultPropertyGroups={resultPropertyGroups}
                onColorColumnToggle={onColorColumnToggle}
                onColorGroupToggle={onColorGroupToggle}
            />
        </div>
    )
}

export default memo(ColorSelectActionButton)
