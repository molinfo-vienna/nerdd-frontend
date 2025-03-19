import { type RefObject } from "react";
import FileUploadAndList from "../fileUpload/FileUploadAndList";

// Define type for the component props
type FileFieldProps = {
    input?: {
        [key: string]: any;
    };
    meta?: {
        [key: string]: any;
    };
    positionReference?: RefObject<HTMLElement>;
    [key: string]: any;
}

export default function FileField({
    input,
    meta,
    positionReference,
    ...props
}: FileFieldProps) {
    return (
        <FileUploadAndList
            name="inputFile"
            tooltipPositionReference={positionReference}
            {...input}
            {...props}
        />
    )
}
