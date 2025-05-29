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
import { useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"

type PopUpProps = {
    text: string
    placement?: "top" | "bottom" | "left" | "right"
    children: ReactNode
    className?: string
}

export default function PopUp({
    text,
    placement = "top",
    children,
    className,
}: PopUpProps) {
    const [isOpen, setIsOpen] = useState(false)

    const arrowRef = useRef(null)

    const { refs, floatingStyles, context } = useFloating({
        placement,
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
                className={className}
                ref={refs.setReference}
                {...getReferenceProps()}
            >
                {children}
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
                            {text}
                        </div>
                    </div>,
                    document.body,
                )}
        </>
    )
}
