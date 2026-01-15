import classNames from "classnames"
import { type FieldRenderProps } from "react-final-form"
import { useTooltipPositionReference } from "./TooltipPositionReferenceContext"

type TextareaProps = FieldRenderProps<string> & {
    rows?: number
    placeholder?: string
    className?: string
}

export default function Textarea({
    input,
    meta,
    rows,
    placeholder,
    className,
}: TextareaProps) {
    const error = meta.error || meta.submitError
    const tooltipPositionReference = useTooltipPositionReference()
    return (
        <>
            <textarea
                rows={rows}
                placeholder={placeholder}
                className={classNames("form-control", className, {
                    "is-invalid": meta.touched && error,
                })}
                {...input}
                ref={tooltipPositionReference}
            ></textarea>
            {meta.touched && error && (
                <div className="invalid-feedback">{error}</div>
            )}
        </>
    )
}
