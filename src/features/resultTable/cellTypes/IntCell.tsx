import type { CellRendererProps } from "./types"

export default function IntCell({ value }: CellRendererProps) {
    if (value == null) {
        return "-"
    }
    return value
}
