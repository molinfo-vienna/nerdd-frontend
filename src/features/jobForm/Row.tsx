import classNames from "classnames"
import { type ReactNode } from "react"
import Tooltip from "./Tooltip"

type RowProps = {
    helpText?: string
    children: ReactNode
    className?: string
}

export default function Row({ helpText, children, className }: RowProps) {
    return (
        <div className={classNames(className, "mb-3")}>
            <Tooltip helpText={helpText}>{children}</Tooltip>
        </div>
    )
}
