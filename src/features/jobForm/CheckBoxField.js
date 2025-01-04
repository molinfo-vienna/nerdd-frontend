import React from "react"

export default function CheckBoxField({
    input,
    meta,
    label,
    positionReference,
    ...props
}) {
    const modifiedProps = {
        ...props,
        className: `form-check-input ${props.className ?? ""} ${meta.touched && meta.error ? "is-invalid" : ""}`,
    }
    return (
        <div className="form-check form-check-lg">
            <input
                {...modifiedProps}
                {...input}
                type="checkbox"
                ref={positionReference}
            />
            {label && (
                <label
                    htmlFor={input.name}
                    className="form-check-label fs-6 align-middle"
                >
                    {label}
                </label>
            )}
            {meta.touched && meta.error && (
                <div className="invalid-feedback">{meta.error}</div>
            )}
        </div>
    )
}
