import type { CellRendererProps } from "./types"

export default function ImageCell({ value, compressed }: CellRendererProps) {
    if (value == null) {
        return "-"
    }

    if (compressed) {
        // Images on compressed cells (e.g. atom or derivative properties) are smaller,
        // but zoomable on hover.
        return (
            <div className="zoomable">
                <img
                    className="object-fit-contain"
                    src={value}
                    width={150}
                    height={90}
                />
            </div>
        )
    } else {
        return (
            <img
                className="object-fit-contain"
                src={value}
                width={300}
                height={180}
            />
        )
    }
}
