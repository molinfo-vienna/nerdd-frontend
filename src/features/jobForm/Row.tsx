import classNames from "classnames"
import { type ReactNode, useCallback, useRef } from "react"
import { TooltipPositionProvider } from "./TooltipPositionReferenceContext"
import Tooltip from "./Tooltip"

type RowProps = {
    helpText?: string
    children: ReactNode
    className?: string
}

export default function Row({ helpText, children, className }: RowProps) {
    const fallbackTooltipPositionReference = useRef<HTMLDivElement>(null)
    const internalTooltipPositionReference = useRef<HTMLElement>(null)

    const setFallbackTooltipPositionReference = useCallback(
        (element: HTMLDivElement | null) => {
            fallbackTooltipPositionReference.current = element
            if (internalTooltipPositionReference.current === null) {
                internalTooltipPositionReference.current = element
            }
        },
        [],
    )

    const setTooltipPositionReference = useCallback(
        (element: HTMLElement | null) => {
            internalTooltipPositionReference.current =
                element ?? fallbackTooltipPositionReference.current
        },
        [],
    )

    // The connection line starts at the first child. The tooltip text itself remains
    // aligned to the right edge of this row.
    const [firstChild, ...restChildren] = Array.isArray(children)
        ? children
        : [children]

    return (
        <TooltipPositionProvider value={setTooltipPositionReference}>
            <div className={classNames(className, "mb-3")}>
                <Tooltip
                    helpText={helpText}
                    tooltipPositionReference={internalTooltipPositionReference}
                >
                    {/* The remaining children do not influence the connection line. */}
                    <div ref={setFallbackTooltipPositionReference}>
                        {firstChild}
                    </div>
                    {/* remaining children are also rendered */}
                    {restChildren}
                </Tooltip>
            </div>
        </TooltipPositionProvider>
    )
}
