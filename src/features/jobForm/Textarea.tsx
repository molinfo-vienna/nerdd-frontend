import { type RefObject } from "react"

type TextareaProps = {
    input: {
        [key: string]: any
    }
    meta: {
        touched?: boolean
        error?: string
        [key: string]: any
    }
    positionReference?:
        | RefObject<HTMLTextAreaElement>
        | ((instance: HTMLTextAreaElement | null) => void)
    className?: string
    [key: string]: any
}

export default function Textarea({
    input,
    meta,
    positionReference,
    className = "",
    ...props
}: TextareaProps) {
    const modifiedProps = {
        ...props,
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
