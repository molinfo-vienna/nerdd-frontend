import { type RefObject } from "react"
import { type FieldRenderProps } from "react-final-form"

type TextareaProps = FieldRenderProps<string> & {
    positionReference?:
        | RefObject<HTMLTextAreaElement>
        | ((instance: HTMLTextAreaElement | null) => void)
    className?: string
}

export default function Textarea({
    input,
    meta,
    positionReference,
    className = "",
}: TextareaProps) {
    // TODO: use classNames
    const modifiedProps = {
        className: `form-control ${className} ${meta.touched && meta.error ? "is-invalid" : ""}`,
    }

    return (
        <>
            <textarea
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
