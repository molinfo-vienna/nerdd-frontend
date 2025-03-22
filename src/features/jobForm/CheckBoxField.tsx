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
    // TODO: use classNames
    const modifiedProps = {
        className: `form-check-input ${className ?? ""} ${meta.touched && meta.error ? "is-invalid" : ""}`,
    }
    return (
        <div className="form-check form-check-lg">
            <input
                {...modifiedProps}
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
