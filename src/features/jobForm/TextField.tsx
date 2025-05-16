import classNames from "classnames"
import { type RefObject } from "react"
import { type FieldRenderProps } from "react-final-form"

type TextFieldProps = FieldRenderProps<string> & {
    label?: string
    placeholder?: string
    positionReference?: RefObject<HTMLInputElement>
}

export default function TextField({
    input,
    meta,
    label,
    placeholder,
    positionReference,
}: TextFieldProps) {
    return (
        <div className="form-floating mb-3">
            <input
                type="text"
                placeholder={placeholder}
                className={classNames("form-control", {
                    "is-invalid": meta.touched && meta.error,
                })}
                {...input}
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
