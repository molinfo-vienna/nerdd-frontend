import {
    autoUpdate,
    arrow,
    type Middleware,
    safePolygon,
    useClick,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
    useTransitionStyles,
} from "@floating-ui/react"
import {
    type CSSProperties,
    type ReactNode,
    type RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react"
import Markdown from "react-markdown"
import "./style.css"

type TooltipProps = {
    children: ReactNode
    helpText?: string
    tooltipPositionReference: RefObject<HTMLElement | null>
}

export default function Tooltip({
    children,
    helpText,
    tooltipPositionReference,
}: TooltipProps) {
    const [isOpen, setIsOpen] = useState(false)

    const arrowRef = useRef(null)
    const rowReferenceRef = useRef<HTMLDivElement>(null)

    const alignToRowEnd: Middleware = {
        name: "alignToRowEnd",
        fn({ x, rects }) {
            const rowRight =
                rowReferenceRef.current?.getBoundingClientRect().right
            const controlRight = rects.reference.x + rects.reference.width
            const connectionLineExtension = Math.max(
                0,
                (rowRight ?? controlRight) - controlRight,
            )

            return {
                x: x + connectionLineExtension,
                data: { connectionLineExtension },
            }
        },
    }

    // check if the help text is empty
    const hasHelpText = helpText != null && helpText.trim().length > 0

    const { refs, floatingStyles, context, middlewareData } = useFloating({
        placement: "right",
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [alignToRowEnd, arrow({ element: arrowRef })],
        whileElementsMounted: autoUpdate,
    })

    const setRowReference = useCallback(
        (element: HTMLDivElement | null) => {
            rowReferenceRef.current = element
            refs.setReference(element)
        },
        [refs],
    )

    const connectionLineExtension =
        (middlewareData.alignToRowEnd?.connectionLineExtension as
            | number
            | undefined) ?? 0

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
    const click = useClick(context, {
        // should be used in combination with useHover
        ignoreMouse: true,
        // do not catch "space" or "enter" key presses here
        // -> user can still type "space" in text fields
        keyboardHandlers: false,
    })
    const focus = useFocus(context)
    const dismiss = useDismiss(context, {
        // close the tooltip when clicking outside
        outsidePress: true,
    })

    const role = useRole(context, {
        // ARIA role for the tooltip
        role: "tooltip",
    })

    // Merge all the interactions into prop getters
    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        click,
        focus,
        dismiss,
        role,
    ])

    useEffect(() => {
        if (tooltipPositionReference.current) {
            refs.setPositionReference(tooltipPositionReference.current)
        }
    }, [tooltipPositionReference, refs])

    return (
        <div>
            <div ref={setRowReference} {...getReferenceProps()}>
                {children}
            </div>
            {isMounted && hasHelpText && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    // don't show the tooltip on smaller screens
                    className="d-none d-lg-block"
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
                                style={
                                    {
                                        "--connection-line-extension": `${connectionLineExtension}px`,
                                    } as CSSProperties
                                }
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
                                     * TODO: use CSS or markdown parser options instead
                                     */}
                                    <p className="m-n3"></p>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* copy of help element above, but for small screens */}
            <div className="d-flex d-lg-none">
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
    )
}
