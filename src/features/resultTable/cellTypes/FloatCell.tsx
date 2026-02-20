import type { CellRendererProps } from "./types"

export default function FloatCell({
    value,
    resultProperty,
}: CellRendererProps) {
    const precision = resultProperty.precision || 2
    if (value == null) {
        return "-"
    }
    if (typeof value === "number") {
        return value.toFixed(precision)
    }
    return value
}
