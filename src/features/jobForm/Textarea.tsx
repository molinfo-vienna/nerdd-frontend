import PropTypes from "prop-types"
import { refType } from "../../types"

export default function Textarea({
    input,
    meta,
    positionReference,
    className,
    ...props
}) {
    const modifiedProps = {
        ...props,
        className: `form-control ${className} ${meta.touched && meta.error ? "is-invalid" : ""}`,
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

Textarea.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    positionReference: refType,
    className: PropTypes.string,
}
