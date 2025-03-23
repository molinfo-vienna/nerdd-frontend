import classNames from "classnames"
import { type RefObject } from "react"
import { type FieldRenderProps } from "react-final-form"

type CheckBoxFieldProps = FieldRenderProps<boolean> & {
    label?: string
    positionReference?:
        | RefObject<HTMLElement>
        | ((instance: HTMLElement | null) => void)
    className?: string
}

export default function CheckBoxField({
    input,
    meta,
    label,
    positionReference,
    className,
}: CheckBoxFieldProps) {
    return (
        <div className="form-check form-check-lg">
            <input
                className={classNames("form-check-input", className, {
                    "is-invalid": meta.touched && meta.error,
                })}
                {...input}
                type="checkbox"
                ref={positionReference}
            />
            {label && (
                <label
                    htmlFor={input.name}
                    className="form-check-label fs-6 align-middle"
                >
                    {label}
                </label>
            )}
            {meta.touched && meta.error && (
                <div className="invalid-feedback">{meta.error}</div>
            )}
        </div>
    )
}
