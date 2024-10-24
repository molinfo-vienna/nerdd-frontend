import PropTypes from "prop-types"
import React, { useRef } from "react"
import Markdown from "react-markdown"
import { refType } from "../../types"
import Tooltip from "./Tooltip"

export default function Row({
    label,
    labelFor,
    helpText,
    children,
    positionReference,
    ...props
}) {
    const ref = useRef()

    const modifiedProps = {
        ...props,
        className:
            props.className === undefined ? "mb-3" : props.className + " mb-3",
    }

    // we always put the anchor of the tooltip centered w.r.t. the first child
    // the remaining children are rendered, but do not influence the tooltip position
    const [firstChild, ...restChildren] = React.Children.toArray(children)

    return (
        <div {...modifiedProps}>
            <Tooltip
                helpText={helpText}
                positionReference={
                    positionReference === undefined ? ref : positionReference
                }
            >
                {label && (
                    <label htmlFor={labelFor} className="form-label fw-bold">
                        {label}
                    </label>
                )}

                {/* again: tooltip is centered at the first child */}
                <div ref={positionReference === undefined ? ref : null}>
                    {firstChild}
                </div>
                {/* remaining children are also rendered */}
                {restChildren}
            </Tooltip>

            {/* copy of help element above, but for small screens */}
            <div className="d-flex d-xl-none">
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

Row.propTypes = {
    label: PropTypes.string,
    labelFor: PropTypes.string,
    helpText: PropTypes.string,
    children: PropTypes.node,
    positionReference: refType,
}
