import type { CellRendererProps } from "./types"

export default function SourceListCell({ value }: CellRendererProps) {
    if (value == null) {
        return "-"
    }
    return value
}
