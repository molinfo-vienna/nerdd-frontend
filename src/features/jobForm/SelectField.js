import PropTypes from "prop-types"
import React from "react"
import { refType } from "../../types"

export default function SelectField({
    input,
    meta,
    label,
    choices,
    positionReference,
    className,
    ...props
}) {
    const modifiedProps = {
        ...props,
        className: `form-select ${className ?? ""} ${meta.touched && meta.error ? "is-invalid" : ""}`,
    }
    return (
        <div className="form-floating mb-3">
            <select {...modifiedProps} {...input} ref={positionReference}>
                <option disabled value="">
                    Select...
                </option>
                {choices.map(({ label, value }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
            {label && (
                <label htmlFor={input.name} className="form-label">
                    {label}
                </label>
            )}
            {meta.touched && meta.error && (
                <div className="invalid-feedback">{meta.error}</div>
            )}
        </div>
    )
}

SelectField.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string,
    choices: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        }),
    ).isRequired,
    positionReference: refType,
    className: PropTypes.string,
}
