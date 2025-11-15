import type { CellRendererProps } from "./types"

export default function DefaultCell({
    value,
    resultProperty,
}: CellRendererProps) {
    console.warn(
        `Unknown result property type: ${resultProperty.type} for ${resultProperty.name}`,
    )

    if (value == null) {
        return "-"
    }
    return value
}
