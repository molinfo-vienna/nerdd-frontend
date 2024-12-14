import {
    arrow,
    safePolygon,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
    useTransitionStyles,
} from "@floating-ui/react"
import React, { useEffect, useRef, useState } from "react"
import Markdown from "react-markdown"
import "./style.css"

export default function Tooltip({ children, helpText, positionReference }) {
    const [isOpen, setIsOpen] = useState(false)

    const arrowRef = useRef(null)

    // check if the help text is empty
    const hasHelpText = helpText != null && helpText.trim().length > 0

    const { refs, floatingStyles, context } = useFloating({
        placement: "right",
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [arrow({ element: arrowRef })],
    })

    // fade-in and fade-out transition styles
    const { isMounted, styles } = useTransitionStyles(context, {
        duration: 500,
        initial: {
            opacity: 0,
            transform: "translateX(-15px)",
        },
        open: {
            opacity: 1,
            transform: "translateX(0)",
        },
        close: {
            opacity: 0,
            transform: "translateX(-15px)",
        },
    })

    const hover = useHover(context, {
        move: false,
        // if the user hovers over the tooltip, it should stay open
        handleClose: safePolygon(),
    })
    const focus = useFocus(context)
    const dismiss = useDismiss(context, {
        // if the user clicks on the tooltip, it should stay open
        outsidePress: false,
    })

    const role = useRole(context, {
        // ARIA role for the tooltip
        role: "tooltip",
    })

    // Merge all the interactions into prop getters
    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss,
        role,
    ])

    useEffect(() => {
        if (positionReference.current) {
            refs.setPositionReference(positionReference.current)
        }
    }, [positionReference])

    return (
        <div>
            <div ref={refs.setReference} {...getReferenceProps()}>
                {children}
            </div>
            {isMounted && hasHelpText && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    // don't show the tooltip on smaller screens
                    className="d-none d-xl-block"
                    {...getFloatingProps()}
                >
                    <div style={styles}>
                        {/* Use flexbox to position arrow and text */}
                        <div className="d-flex flex-row">
                            {/*
                             * Connection line
                             *
                             * align-self-stretch: use the same height as the tooltip
                             *   (at the right of the line). This is necessary to
                             *   give the user the chance to hover over the line and
                             *   keep the tooltip open.
                             */}
                            <div
                                className="align-self-stretch connection-line"
                                ref={arrowRef}
                            >
                                {/*
                                 * We need another flexbox for centering the line
                                 * vertically.
                                 */}
                                <div className="d-flex h-100 align-items-center px-3">
                                    <div className="border-bottom w-100"></div>
                                </div>
                            </div>
                            {/*
                             * Help text
                             *
                             * py-5: padding on the y-axis to increase the size of the
                             *   tooltip. As a result, the tooltip won't close
                             *   immediately if the user moves the mouse out of the
                             *   tooltip.
                             */}
                            <div className="py-5 tooltip-text">
                                <small id="inputFileHelp" className="form-text">
                                    <Markdown>{helpText}</Markdown>
                                    {/*
                                     * The last paragraph of the markdown text will have
                                     * an undesired margin at the bottom. We remove it by
                                     * adding an empty paragraph with negative margin.
                                     */}
                                    <p className="m-n3"></p>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
