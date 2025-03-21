import { type RefObject } from "react"

type SelectOption = {
    label: string
    value: string
}

type SelectFieldProps = {
    input: {
        name: string
        [key: string]: any
    }
    meta: {
        touched?: boolean
        error?: string
        [key: string]: any
    }
    label?: string
    choices: SelectOption[]
    positionReference?:
        | RefObject<HTMLElement>
        | ((instance: HTMLElement | null) => void)
    className?: string
    [key: string]: any
}

export default function SelectField({
    input,
    meta,
    label,
    choices,
    positionReference,
    className,
    ...props
}: SelectFieldProps) {
    const modifiedProps = {
        ...props,
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
