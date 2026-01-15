import classNames from "classnames"
import { type FieldRenderProps } from "react-final-form"
import { useTooltipPositionReference } from "./TooltipPositionReferenceContext"

type CheckBoxFieldProps = FieldRenderProps<boolean> & {
    label?: string
    className?: string
}

export default function CheckBoxField({
    input,
    meta,
    label,
    className,
}: CheckBoxFieldProps) {
    const error = meta.error || meta.submitError
    const tooltipPositionReference = useTooltipPositionReference()
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
                    ref={tooltipPositionReference}
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
