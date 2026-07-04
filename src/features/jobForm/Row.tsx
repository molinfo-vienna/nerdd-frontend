import classNames from "classnames"
import { type ReactNode } from "react"
import Tooltip from "./Tooltip"

type RowProps = {
    helpText?: string
    children: ReactNode
    className?: string
}

export default function Row({ helpText, children, className }: RowProps) {
    // check if the help text is empty
    const hasHelpText = helpText != null && helpText.trim().length > 0

    return (
        <div className={classNames(className, "mb-3")}>
            {hasHelpText ? (
                <Tooltip helpText={helpText}>{children}</Tooltip>
            ) : (
                children
            )}
        </div>
    )
}
