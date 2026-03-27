import classNames from "classnames"
import "./MoleculePlaceholder.scss"

export type MoleculePlaceholderProps = {
    className?: string
}

export default function MoleculePlaceholder({
    className,
}: MoleculePlaceholderProps) {
    return (
        <g className={classNames("molecule-placeholder", className)}>
            {/* Placeholder skeleton structure */}
            <g className="molecule-placeholder__bonds">
                <line x1="280" y1="215" x2="328" y2="242.5" />
                <line x1="328" y1="242.5" x2="328" y2="297.5" />
                <line x1="328" y1="297.5" x2="280" y2="325" />
                <line x1="280" y1="325" x2="232" y2="297.5" />
                <line x1="232" y1="297.5" x2="232" y2="242.5" />
                <line x1="232" y1="242.5" x2="280" y2="215" />
                <line x1="280" y1="215" x2="280" y2="175" />
                <line x1="328" y1="242.5" x2="368" y2="220" />
                <line x1="328" y1="297.5" x2="368" y2="320" />
                <line x1="280" y1="325" x2="280" y2="365" />
                <line x1="232" y1="297.5" x2="192" y2="320" />
                <line x1="232" y1="242.5" x2="192" y2="220" />
            </g>
            <g className="molecule-placeholder__atoms">
                <circle cx="280" cy="215" r="4" />
                <circle cx="328" cy="242.5" r="4" />
                <circle cx="328" cy="297.5" r="4" />
                <circle cx="280" cy="325" r="4" />
                <circle cx="232" cy="297.5" r="4" />
                <circle cx="232" cy="242.5" r="4" />
                <circle cx="280" cy="175" r="4" />
                <circle cx="368" cy="220" r="4" />
                <circle cx="368" cy="320" r="4" />
                <circle cx="280" cy="365" r="4" />
                <circle cx="192" cy="320" r="4" />
                <circle cx="192" cy="220" r="4" />
            </g>
        </g>
    )
}
