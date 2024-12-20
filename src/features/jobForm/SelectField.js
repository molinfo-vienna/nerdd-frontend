import React from "react"

export default function SelectField({ input, meta, choices, ...props }) {
    const modifiedProps = {
        ...props,
        className: `form-select ${props.className || ""} ${meta.touched && meta.error ? "is-invalid" : ""}`,
    }
    return (
        <div>
            <select {...modifiedProps} {...input}>
                <option disabled value="">
                    Select...
                </option>
                {choices.map(({ label, value }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
            {meta.touched && meta.error && (
                <div className="invalid-feedback">{meta.error}</div>
            )}
        </div>
    )
}
