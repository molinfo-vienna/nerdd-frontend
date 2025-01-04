import React from "react"

export default function SelectField({
    input,
    meta,
    label,
    choices,
    positionReference,
    ...props
}) {
    const modifiedProps = {
        ...props,
        className: `form-select ${props.className ?? ""} ${meta.touched && meta.error ? "is-invalid" : ""}`,
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
