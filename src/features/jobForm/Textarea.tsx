import classNames from "classnames"
import { type RefObject } from "react"
import { type FieldRenderProps } from "react-final-form"

type TextareaProps = FieldRenderProps<string> & {
    positionReference?: RefObject<HTMLTextAreaElement | null>
    rows?: number
    placeholder?: string
    className?: string
}

export default function Textarea({
    input,
    meta,
    positionReference,
    rows,
    placeholder,
    className,
}: TextareaProps) {
    const error = meta.error || meta.submitError
    return (
        <>
            <textarea
                rows={rows}
                placeholder={placeholder}
                className={classNames("form-control", className, {
                    "is-invalid": meta.touched && error,
                })}
                {...input}
                ref={positionReference}
            ></textarea>
            {meta.touched && error && (
                <div className="invalid-feedback">{error}</div>
            )}
        </>
    )
}
