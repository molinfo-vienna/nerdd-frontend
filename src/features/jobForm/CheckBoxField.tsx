import { type RefObject } from "react";

type CheckBoxFieldProps = {
    input: {
        name: string;
        [key: string]: any;
    };
    meta: {
        touched?: boolean;
        error?: string;
        [key: string]: any;
    };
    label?: string;
    positionReference?: RefObject<HTMLElement> | ((instance: HTMLElement | null) => void);
    className?: string;
    [key: string]: any;
}

export default function CheckBoxField({
    input,
    meta,
    label,
    positionReference,
    className,
    ...props
}: CheckBoxFieldProps) {
    const modifiedProps = {
        ...props,
        className: `form-check-input ${className ?? ""} ${meta.touched && meta.error ? "is-invalid" : ""}`,
    }
    return (
        <div className="form-check form-check-lg">
            <input
                {...modifiedProps}
                {...input}
                type="checkbox"
                ref={positionReference}
            />
            {label && (
                <label
                    htmlFor={input.name}
                    className="form-check-label fs-6 align-middle"
                >
                    {label}
                </label>
            )}
            {meta.touched && meta.error && (
                <div className="invalid-feedback">{meta.error}</div>
            )}
        </div>
    )
}
