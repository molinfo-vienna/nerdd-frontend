import type { CellRendererProps } from "./types"

export default function BoolCell({ value }: CellRendererProps) {
    if (value == null) {
        return "-"
    }
    return value ? "Yes" : "No"
}
