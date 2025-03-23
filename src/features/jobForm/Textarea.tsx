import classNames from "classnames"
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
    className,
}: TextareaProps) {
    return (
        <>
            <textarea
                rows={rows}
                className={classNames("form-control", className, {
                    "is-invalid": meta.touched && meta.error,
                })}
                {...input}
                ref={positionReference}
            ></textarea>
            {meta.touched && meta.error && (
                <div className="invalid-feedback">{meta.error}</div>
            )}
        </>
    )
}
