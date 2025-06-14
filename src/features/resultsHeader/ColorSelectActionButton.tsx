import { ResultProperty } from "@/types"
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

export default function ColorSelectActionButton({
    atomColorProperty,
    possibleAtomColorProperties,
    onAtomColorPropertyChange,
    resultPropertyGroups,
    onColorColumnToggle,
    onColorGroupToggle,
}: ColorSelectActionButtonProps) {
    return (
        <ActionButton label="Colors">
            <ActionButton.Icon>
                <FaPalette />
            </ActionButton.Icon>

            <ActionButton.Dropdown>
                <ColorSelectDropdown
                    selectedAtomColorProperty={atomColorProperty}
                    possibleAtomColorProperties={possibleAtomColorProperties}
                    onSelectedAtomColorPropertyChange={
                        onAtomColorPropertyChange
                    }
                    resultPropertyGroups={resultPropertyGroups}
                    onColorColumnToggle={onColorColumnToggle}
                    onColorGroupToggle={onColorGroupToggle}
                />
            </ActionButton.Dropdown>
        </ActionButton>
    )
}
