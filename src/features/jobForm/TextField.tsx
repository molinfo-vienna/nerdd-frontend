import classNames from "classnames"
import { type RefObject } from "react"
import { type FieldRenderProps } from "react-final-form"

type TextFieldProps = FieldRenderProps<string> & {
    label?: string
    placeholder?: string
    positionReference?: RefObject<HTMLInputElement | null>
}

export default function TextField({
    input,
    meta,
    label,
    placeholder,
    positionReference,
}: TextFieldProps) {
    const error = meta.error || meta.submitError
    return (
        <div className="form-floating mb-3">
            <input
                type="text"
                placeholder={placeholder}
                className={classNames("form-control", {
                    "is-invalid": meta.touched && error,
                })}
                {...input}
                ref={positionReference}
            />
            {label && (
                <label htmlFor={input.name} className="form-label">
                    {label}
                </label>
            )}
            {error && meta.touched && (
                <div className="invalid-feedback">{error}</div>
            )}
        </div>
    )
}
