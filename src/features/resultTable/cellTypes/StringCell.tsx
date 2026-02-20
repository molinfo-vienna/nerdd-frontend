import type { CellRendererProps } from "./types"

export default function StringCell({
    value,
    resultProperty,
}: CellRendererProps) {
    if (value == null) {
        return "-"
    }

    if (resultProperty.choices != null) {
        const choice = resultProperty.choices.find(
            (choice) => choice.value === value,
        )
        if (choice != null) {
            return choice.label
        }
    }

    return value
}
