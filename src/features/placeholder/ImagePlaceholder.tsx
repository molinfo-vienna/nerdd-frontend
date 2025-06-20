import classNames from "classnames"

type ImagePlaceholderProps = {
    width?: string
    height?: string
}

export default function ImagePlaceholder({
    width,
    height,
}: ImagePlaceholderProps) {
    return (
        <div
            className={classNames("placeholder-glow", {
                "w-100": width === undefined,
                "h-100": height === undefined,
            })}
            style={{ width: width, height: height }}
        >
            <div className="placeholder bg-light w-100 h-100"></div>
        </div>
    )
}
