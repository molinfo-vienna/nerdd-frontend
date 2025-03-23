import { type RefObject } from "react"
import { type FieldRenderProps } from "react-final-form"

type TextareaProps = FieldRenderProps<string> & {
    positionReference?:
        | RefObject<HTMLTextAreaElement>
        | ((instance: HTMLTextAreaElement | null) => void)
    rows?: number
    className?: string
}

export default function Textarea({
    input,
    meta,
    positionReference,
    rows,
    className = "",
}: TextareaProps) {
    // TODO: use classNames
    const modifiedProps = {
        className: `form-control ${className} ${meta.touched && meta.error ? "is-invalid" : ""}`,
    }

    return (
        <>
            <textarea
                rows={rows}
                {...modifiedProps}
                {...input}
                ref={positionReference}
            ></textarea>
            {meta.touched && meta.error && (
                <div className="invalid-feedback">{meta.error}</div>
            )}
        </>
    )
}
