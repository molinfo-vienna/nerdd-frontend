import { ResultProperty } from "@/types"
import { FaPalette } from "react-icons/fa6"
import ColorSelectDropdown from "../colorSelect/ColorSelectDropdown"
import ActionButton from "./ActionButton"

type ColorSelectActionButtonProps = {
    atomColorProperty?: ResultProperty
    possibleAtomColorProperties: ResultProperty[]
    onAtomColorPropertyChange: (property?: ResultProperty) => void
}

export default function ColorSelectActionButton({
    atomColorProperty,
    possibleAtomColorProperties,
    onAtomColorPropertyChange,
}: ColorSelectActionButtonProps) {
    return (
        <ActionButton
            label="Colors"
            disabled={possibleAtomColorProperties.length === 0}
        >
            <ActionButton.Icon>
                <FaPalette size={34} />
            </ActionButton.Icon>

            <ActionButton.Dropdown>
                <ColorSelectDropdown
                    selectedAtomColorProperty={atomColorProperty}
                    possibleAtomColorProperties={possibleAtomColorProperties}
                    onSelectedAtomColorPropertyChange={
                        onAtomColorPropertyChange
                    }
                />
            </ActionButton.Dropdown>
        </ActionButton>
    )
}
