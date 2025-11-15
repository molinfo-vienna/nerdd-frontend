import type { CellRendererProps } from "./types"

export default function RepresentationCell({ value }: CellRendererProps) {
    if (value == null) {
        return "-"
    }
    return value
}
