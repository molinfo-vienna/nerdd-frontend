import classNames from "classnames"
import { Children, MouseEvent, useCallback } from "react"
import { Link, To } from "react-router-dom"

type ActionButtonProps = {
    label: string
    style?: "secondary" | "primary" | "danger" | "success" | "warning" | "info"
    to?: To
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
    disabled?: boolean
    children?: React.ReactNode
}

export default function ActionButton({
    label,
    style = "primary",
    to = "#",
    disabled = false,
    onClick,
    children,
    ...props
}: ActionButtonProps) {
    const childrenArray = Children.toArray(children)

    const icon = childrenArray.find(
        (child: any) => child.type === ActionButton.Icon,
    )

    const handleClick = useCallback(
        (e: MouseEvent<HTMLAnchorElement>) => {
            if (onClick !== undefined) {
                e.preventDefault()
                onClick(e)
            }
        },
        [onClick],
    )

    return (
        <Link
            className={classNames(
                "btn text-center text-decoration-none p-3 d-flex flex-column justify-content-end align-items-center",
                {
                    // z-1 is necessary for styled buttons to keep their colored border visible
                    // when hovering neighbor elements
                    [`btn-outline-${style} z-1`]: style !== "primary",
                    "btn-outline-secondary text-primary": style === "primary",
                    disabled,
                },
            )}
            to={to}
            onClick={handleClick}
            type="button"
            {...props}
        >
            <span
                className="mb-sm-2 fs-2 align-bottom lh-1 text-center"
                // 35px is the width to fit 5 icons in a row on a small screen
                // this width gets irrelevant on larger screens, because the icon is centered
                style={{ minWidth: "35px" }}
            >
                {icon}
            </span>

            {/* Button label */}
            <span
                // d-none: hide label on very small screens
                // d-sm-inline: show label on small screens and larger
                className="d-none d-sm-inline"
                style={{ width: "90px" }}
            >
                {label}
            </span>
        </Link>
    )
}

ActionButton.Icon = function ActionButtonIcon({ children }) {
    return <>{children}</>
}
