import React from "react"

export default function Textarea({ input, meta, positionReference, ...props }) {
    const modifiedProps = {
        ...props,
        className: `form-control ${props.className} ${meta.touched && meta.error ? "is-invalid" : ""}`,
    }

    return (
        <>
            <textarea
                {...modifiedProps}
                {...input}
                ref={positionReference}
            ></textarea>
            {meta.touched && meta.error && (
                <div className="invalid-feedback">{meta.error}</div>
            )}
        </>
    )
}
