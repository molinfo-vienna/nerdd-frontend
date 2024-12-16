import React from "react"

export default function CheckBoxField({ input, meta, ...props }) {
    const modifiedProps = {
        ...props,
        className: `form-check-input ${props.className || ""} ${meta.touched && meta.error ? "is-invalid" : ""}`,
    }
    return (
        <div className="form-check">
            <input
                {...modifiedProps}
                {...input}
                type="checkbox"
                checked={!!input.value}
            />
            {meta.touched && meta.error && (
                <div className="invalid-feedback">{meta.error}</div>
            )}
        </div>
    )
}
