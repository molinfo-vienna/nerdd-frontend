import { type RefObject } from "react"
import { type FieldRenderProps } from "react-final-form"

type SelectOption = {
    label: string
    value: string
}

type SelectFieldProps = FieldRenderProps<string> & {
    label?: string
    choices: SelectOption[]
    positionReference?:
        | RefObject<HTMLElement>
        | ((instance: HTMLElement | null) => void)
    className?: string
}

export default function SelectField({
    input,
    meta,
    label,
    choices,
    positionReference,
    className,
}: SelectFieldProps) {
    // TODO: use classNames
    const modifiedProps = {
        className: `form-select ${className ?? ""} ${meta.touched && meta.error ? "is-invalid" : ""}`,
    }
    return (
        <div className="form-floating mb-3">
            <select {...modifiedProps} {...input} ref={positionReference}>
                <option disabled value="">
                    Select...
                </option>
                {choices.map(({ label, value }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
            {label && (
                <label htmlFor={input.name} className="form-label">
                    {label}
                </label>
            )}
            {meta.touched && meta.error && (
                <div className="invalid-feedback">{meta.error}</div>
            )}
        </div>
    )
}
