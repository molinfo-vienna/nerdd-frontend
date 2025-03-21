import { type ReactNode, type RefObject, useRef } from "react"
import Tooltip from "./Tooltip"

type RowProps = {
    label?: string
    labelFor?: string
    helpText?: string
    children: ReactNode
    positionReference?: RefObject<HTMLElement>
    className?: string
}

export default function Row({
    label,
    labelFor,
    helpText,
    children,
    positionReference,
    className,
    ...props
}: RowProps) {
    const ref = useRef<HTMLDivElement>(null)

    const modifiedProps = {
        ...props,
        className: `${className ?? ""} mb-3`,
    }

    // we always put the anchor of the tooltip centered w.r.t. the first child
    // the remaining children are rendered, but do not influence the tooltip position
    const [firstChild, ...restChildren] = Array.isArray(children)
        ? children
        : [children]

    return (
        <div {...modifiedProps}>
            <Tooltip
                helpText={helpText}
                positionReference={
                    positionReference === undefined ? ref : positionReference
                }
            >
                {/* again: tooltip is centered at the first child */}
                <div ref={positionReference === undefined ? ref : null}>
                    {firstChild}
                </div>
                {/* remaining children are also rendered */}
                {restChildren}
            </Tooltip>
        </div>
    )
}
