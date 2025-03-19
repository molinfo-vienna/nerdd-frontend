import PropTypes from "prop-types"
import { Children, useRef } from "react"
import { refType } from "../../types"
import Tooltip from "./Tooltip"

export default function Row({
    label,
    labelFor,
    helpText,
    children,
    positionReference,
    className,
    ...props
}) {
    const ref = useRef()

    const modifiedProps = {
        ...props,
        className: `${className ?? ""} mb-3`,
    }

    // we always put the anchor of the tooltip centered w.r.t. the first child
    // the remaining children are rendered, but do not influence the tooltip position
    const [firstChild, ...restChildren] = Children.toArray(children)

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

Row.propTypes = {
    label: PropTypes.string,
    labelFor: PropTypes.string,
    helpText: PropTypes.string,
    children: PropTypes.node,
    positionReference: refType,
    className: PropTypes.string,
}
