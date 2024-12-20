import React from "react"

export default function TextField({ input, meta, ...props }) {
    return (
        <div>
            <input
                type="text"
                className={`form-control ${meta.touched && meta.error && "is-invalid"}`}
                {...input}
            />
            {meta.error && meta.touched && (
                <div className="invalid-feedback">{meta.error}</div>
            )}
        </div>
    )
}
