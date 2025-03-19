import {
    arrow,
    autoUpdate,
    flip,
    FloatingArrow,
    offset,
    safePolygon,
    shift,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
} from "@floating-ui/react"
import PropTypes from "prop-types"
import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import ProblemIcon from "./ProblemIcon"

export default function ProblemIconWithTooltip({
    problemType,
    tooltip,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false)

    const arrowRef = useRef(null)

    const { refs, floatingStyles, context } = useFloating({
        placement: "top",
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [
            offset(5),
            flip(),
            shift(),
            arrow({
                element: arrowRef,
            }),
        ],
        whileElementsMounted: autoUpdate,
    })

    const hover = useHover(context, { move: false, handleClose: safePolygon() })
    const focus = useFocus(context)
    const dismiss = useDismiss(context)

    // Merge all the interactions into prop getters
    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss,
    ])

    return (
        <>
            <div
                ref={refs.setReference}
                {...getReferenceProps()}
                className="problem-icon ms-1 text-white"
            >
                <ProblemIcon problemType={problemType} {...props} />
            </div>
            {isOpen &&
                createPortal(
                    <div
                        ref={refs.setFloating}
                        style={{
                            ...floatingStyles,
                            zIndex: 1100,
                        }}
                        className="tooltip bs-tooltip-auto show"
                        role="tooltip"
                        {...getFloatingProps()}
                    >
                        <FloatingArrow
                            ref={arrowRef}
                            className="tooltip-arrow"
                            context={context}
                        />
                        <div className="tooltip-inner" role="label">
                            {tooltip}
                        </div>
                    </div>,
                    document.body,
                )}
        </>
    )
}

ProblemIconWithTooltip.propTypes = {
    problemType: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
}
