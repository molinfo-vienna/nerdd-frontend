import classNames from "classnames"

type ImagePlaceholderProps = {
    width?: string
    height?: string
    className?: string
}

export default function ImagePlaceholder({
    width,
    height,
    className,
}: ImagePlaceholderProps) {
    return (
        <div
            className={classNames("placeholder-glow", className)}
            style={{ width: width, height: height }}
        >
            <div className="placeholder bg-secondary w-100 h-100"></div>
        </div>
    )
}
