import classNames from "classnames"
import { type RefObject } from "react"
import { type FieldRenderProps } from "react-final-form"

type CheckBoxFieldProps = FieldRenderProps<boolean> & {
    label?: string
    positionReference?: RefObject<HTMLInputElement | null>
    className?: string
}

export default function CheckBoxField({
    input,
    meta,
    label,
    positionReference,
    className,
}: CheckBoxFieldProps) {
    const error = meta.error || meta.submitError
    return (
        <div className="form-check form-check-lg">
            <input
                className={classNames("form-check-input", className, {
                    "is-invalid": meta.touched && error,
                })}
                {...input}
                id={input.name}
                type="checkbox"
            />
            {label && (
                <label
                    htmlFor={input.name}
                    className="form-check-label fs-6 align-middle"
                    ref={positionReference}
                >
                    {label}
                </label>
            )}
            {meta.touched && error && (
                <div className="invalid-feedback">{error}</div>
            )}
        </div>
    )
}
