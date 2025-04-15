import { ResultProperty } from "@/types"
import { IoIosColorPalette } from "react-icons/io"
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
                <IoIosColorPalette size={36} />
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
