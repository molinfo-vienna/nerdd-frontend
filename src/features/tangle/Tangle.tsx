import { useEffect, useRef, useState } from "react"
import Draggable from "react-draggable"
import "./Tangle.css"

const clampValue = (value: number, min: number, max: number): number => {
    return Math.min(max, Math.max(min, value))
}

type TangleProps = {
    initialValue: number
    min: number
    max: number
    setValue: (value: number) => void
    children?: React.ReactNode
}

export default function Tangle({
    initialValue,
    min,
    max,
    setValue,
    children,
}: TangleProps) {
    //
    // parameters
    //

    // min and max number of molecules possible
    const range = max - min

    // distance in pixels that the mouse has to move to change the value to max / min
    const pixelRange = 500
    // exponential scale factor
    const scale = pixelRange / Math.log(range)

    //
    // state
    //

    // this text behaves like an invisible slider
    // initialPixelOffset remembers where the user stopped dragging the slider
    const [initialPixelOffset, setInitialPixelOffset] = useState(
        Math.log(initialValue) * scale,
    )

    // currentPixelOffset is the current value while dragging
    // we compute the value using the formula
    //   value = Math.exp(currentPixelOffset / scale)
    // -> to compute the pixel offset from the value, we use the formula
    //   currentPixelOffset = Math.log(value) * scale
    const [currentPixelOffset, setCurrentPixelOffset] = useState(
        Math.log(initialValue) * scale,
    )

    //
    // dragging behavior
    //

    // reference to the node that is being dragged
    const nodeRef = useRef(null)

    // the initial screen position when starting to drag
    const [initialOffset, setInitialOffset] = useState<{
        x: number
        y: number
    } | null>(null)

    const handleDragStart = (e: any) => {
        setInitialOffset({ x: e.clientX, y: e.clientY })
    }

    const handleDrag = (e: any) => {
        const currentOffset = { x: e.clientX, y: e.clientY }

        const distanceInPixels = clampValue(
            initialPixelOffset + currentOffset.x - initialOffset!.x,
            -pixelRange,
            pixelRange,
        )

        if (distanceInPixels !== currentPixelOffset) {
            setCurrentPixelOffset(distanceInPixels)
        }
    }

    const handleDragEnd = (e: any) => {
        // update the initial pixel offset
        setInitialPixelOffset(currentPixelOffset)
    }

    // based on the position on the invisible slider, calculate the value
    const value =
        Math.sign(currentPixelOffset) *
        Math.exp(Math.abs(currentPixelOffset) / scale)
    const clampedValue = clampValue(value, min, max)

    useEffect(() => {
        setValue(clampedValue)
    }, [clampedValue, setValue])

    return (
        <>
            <Draggable
                onStart={handleDragStart}
                onDrag={handleDrag}
                onStop={handleDragEnd}
                nodeRef={nodeRef}
            >
                <span ref={nodeRef} className="tangle-text">
                    {children}
                </span>
            </Draggable>
        </>
    )
}
