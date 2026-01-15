import classNames from "classnames"
import { type FieldRenderProps } from "react-final-form"
import { useTooltipPositionReference } from "./TooltipPositionReferenceContext"

type SelectOption = {
    label: string
    value: string
}

type SelectFieldProps = FieldRenderProps<string> & {
    label?: string
    choices: SelectOption[]
    className?: string
}

export default function SelectField({
    input,
    meta,
    label,
    choices,
    className,
}: SelectFieldProps) {
    const error = meta.error || meta.submitError
    const tooltipPositionReference = useTooltipPositionReference()
    return (
        <div className="form-floating mb-3">
            <select
                className={classNames("form-select", className, {
                    "is-invalid": meta.touched && error,
                })}
                {...input}
                ref={tooltipPositionReference}
            >
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
            {meta.touched && error && (
                <div className="invalid-feedback">{error}</div>
            )}
        </div>
    )
}
