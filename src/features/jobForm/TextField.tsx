import PropTypes from "prop-types"
import React from "react"
import { refType } from "../../types"

export default function TextField({
    input,
    meta,
    label,
    positionReference,
    ...props
}) {
    return (
        <div className="form-floating mb-3">
            <input
                type="text"
                className={`form-control ${meta.touched && meta.error && "is-invalid"}`}
                {...input}
                {...props}
                ref={positionReference}
            />
            {label && (
                <label htmlFor={input.name} className="form-label">
                    {label}
                </label>
            )}
            {meta.error && meta.touched && (
                <div className="invalid-feedback">{meta.error}</div>
            )}
        </div>
    )
}

TextField.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string,
    positionReference: refType,
}
