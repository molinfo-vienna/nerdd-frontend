import PropTypes from "prop-types"
import React, { useState } from "react"
import Draggable from "react-draggable"
import "./style.scss"

const clampValue = (value, min, max) => {
    return Math.min(max, Math.max(min, value))
}

export default function TangleRuntime({ moleculesPerSecond, initialValue }) {
    //
    // parameters
    //

    // min and max number of molecules possible
    const min = 1
    const max = 100000
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
    const nodeRef = React.useRef(null)

    // the initial screen position when starting to drag
    const [initialOffset, setInitialOffset] = useState(null)

    const handleDragStart = (e) => {
        setInitialOffset({ x: e.clientX, y: e.clientY })
    }

    const handleDrag = (e) => {
        const currentOffset = { x: e.clientX, y: e.clientY }

        const distanceInPixels = clampValue(
            initialPixelOffset + currentOffset.x - initialOffset.x,
            -pixelRange,
            pixelRange,
        )

        if (distanceInPixels !== currentPixelOffset) {
            setCurrentPixelOffset(distanceInPixels)
        }
    }

    const handleDragEnd = (e) => {
        // update the initial pixel offset
        setInitialPixelOffset(currentPixelOffset)
    }

    //
    // displaying the processing time
    //

    // based on the position on the invisible slider, calculate the value
    const value =
        Math.sign(currentPixelOffset) *
        Math.exp(Math.abs(currentPixelOffset) / scale)
    const clampedValue = clampValue(value, min, max)

    // always show meaningful molecule numbers to the user
    // 12345 -> 12000
    // 1234 -> 1200
    // 123 -> 120
    // 12 -> 12
    let roundedValue
    if (clampedValue < 100) {
        roundedValue = Math.round(clampedValue)
    } else {
        const numberOfDigits = Math.floor(Math.log10(clampedValue))
        const factor = Math.pow(10, numberOfDigits - 1)
        roundedValue = Math.round(clampedValue / factor) * factor
    }

    const numberOfMoleculesText =
        clampedValue == 1 ? "1 molecule" : `${roundedValue} molecules`

    const processingTime = (roundedValue / moleculesPerSecond) * 1000

    // format the processing time
    let processingTimeText
    if (processingTime > 48 * 60 * 60 * 1000) {
        // more than 48 hours -> show days
        const days = Math.round(processingTime / (24 * 60 * 60 * 1000))
        processingTimeText = `${days} days`
    } else if (processingTime > 60 * 60 * 1000) {
        // more than 1 hour -> show hours
        const hours = Math.floor(processingTime / (60 * 60 * 1000))
        processingTimeText = `${hours}h`
    } else if (processingTime > 60 * 1000) {
        // more than 1 minute -> show minutes
        const minutes = Math.floor(processingTime / (60 * 1000))
        processingTimeText = `${minutes}min`
    } else if (processingTime > 1000) {
        // more than 1 second -> show seconds
        const seconds = Math.floor(processingTime / 1000)
        processingTimeText = `${seconds}s`
    } else {
        // less than 1 second -> show "< 1s"
        processingTimeText = `< 1s`
    }

    return (
        <>
            <Draggable
                onStart={handleDragStart}
                onDrag={handleDrag}
                onStop={handleDragEnd}
                nodeRef={nodeRef}
            >
                <span ref={nodeRef} className="tangle-text">
                    {numberOfMoleculesText}
                </span>
            </Draggable>{" "}
            in {processingTimeText}
        </>
    )
}

TangleRuntime.propTypes = {
    moleculesPerSecond: PropTypes.number.isRequired,
    initialValue: PropTypes.number.isRequired,
}
