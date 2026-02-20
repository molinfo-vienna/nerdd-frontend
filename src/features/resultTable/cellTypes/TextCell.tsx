import type { CellRendererProps } from "./types"

export default function TextCell({ value, compressed }: CellRendererProps) {
    // unused at the moment
    if (compressed) {
        return (
            <div
                style={{
                    maxWidth: "300px",
                    height: "25px",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        width: "280px",
                        height: "100%",
                        overflowX: "hidden",
                        overflowY: "scroll",
                    }}
                >
                    {value}
                </div>
            </div>
        )
    }

    return value
}
