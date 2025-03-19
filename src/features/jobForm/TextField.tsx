import { type RefObject } from "react";

type TextFieldProps = {
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
    [key: string]: any;
}

export default function TextField({
    input,
    meta,
    label,
    positionReference,
    ...props
}: TextFieldProps) {
    return (
        <div className="form-floating mb-3">
            <input
                type="text"
                className={`form-control ${meta.touched && meta.error && "is-invalid"}`}
                {...input}
                {...props}
                ref={positionReference}
            />
            {label && (
                <label htmlFor={input.name} className="form-label">
                    {label}
                </label>
            )}
            {meta.error && meta.touched && (
                <div className="invalid-feedback">{meta.error}</div>
            )}
        </div>
    )
}
