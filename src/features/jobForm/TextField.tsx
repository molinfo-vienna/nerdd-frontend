import classNames from "classnames"
import { type FieldRenderProps } from "react-final-form"
import { useTooltipPositionReference } from "./TooltipPositionReferenceContext"

type TextFieldProps = FieldRenderProps<string> & {
    label?: string
    placeholder?: string
}

export default function TextField({
    input,
    meta,
    label,
    placeholder,
}: TextFieldProps) {
    const error = meta.error || meta.submitError
    const tooltipPositionReference = useTooltipPositionReference()
    return (
        <div className="form-floating mb-3">
            <input
                type="text"
                placeholder={placeholder}
                className={classNames("form-control", {
                    "is-invalid": meta.touched && error,
                })}
                {...input}
                ref={tooltipPositionReference}
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
