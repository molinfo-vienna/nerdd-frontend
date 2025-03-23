import classNames from "classnames"
import { type RefObject } from "react"
import { type FieldRenderProps } from "react-final-form"

type TextFieldProps = FieldRenderProps<string> & {
    label?: string
    positionReference?:
        | RefObject<HTMLElement>
        | ((instance: HTMLElement | null) => void)
}

export default function TextField({
    input,
    meta,
    label,
    positionReference,
}: TextFieldProps) {
    return (
        <div className="form-floating mb-3">
            <input
                type="text"
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
