import classNames from "classnames"
import { Children } from "react"
import { createPortal } from "react-dom"
import { Link, To } from "react-router-dom"
import Tooltip from "../tooltip/Tooltip"
import "./ActionButton.css"

type ActionButtonProps = {
    label: string
    style?: "secondary" | "primary" | "danger" | "success" | "warning" | "info"
    to?: To
    disabled?: boolean
    tooltip?: string
    modalId?: string
    children?: React.ReactNode
}

export default function ActionButton({
    label,
    style = "primary",
    to = "#",
    disabled = false,
    tooltip = undefined,
    modalId,
    children,
}: ActionButtonProps) {
    const childrenArray = Children.toArray(children)

    const icon = childrenArray.find(
        (child: any) => child.type === ActionButton.Icon,
    )

    const dropdown = childrenArray.find(
        (child: any) => child.type === ActionButton.Dropdown,
    )

    const modal = childrenArray.find(
        (child: any) => child.type === ActionButton.Modal,
    )

    const hasTooltip = !!tooltip
    const hasDropdown = !!dropdown
    const hasModal = !!modal

    let dataBsToggle = undefined
    if (hasTooltip) {
        // Note: tooltips do not work if button is disabled
        // -> for that reason we wrap the button in a div later (see below)
        dataBsToggle = undefined
    } else if (hasModal) {
        dataBsToggle = "modal"
    } else if (hasDropdown) {
        dataBsToggle = "dropdown"
    }

    const buttonFragment = (
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
            type="button"
            data-bs-toggle={dataBsToggle}
            // modal
            data-bs-target={hasModal ? `#${modalId}` : undefined}
            // dropdown
            data-bs-auto-close={hasDropdown ? "outside" : undefined}
            aria-expanded={hasDropdown ? "false" : undefined}
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

    if (hasTooltip) {
        return (
            <Tooltip
                text={tooltip}
                placement="bottom"
                className="tooltip-wrapper"
            >
                {buttonFragment}
            </Tooltip>
        )
    } else if (hasDropdown) {
        return (
            <div className="btn-group dropdown-center" role="group">
                {buttonFragment}
                {dropdown}
            </div>
        )
    } else if (hasModal) {
        return (
            <>
                {buttonFragment}
                {/* Render the modal in the body (because a modal would not render correctly here) */}
                {createPortal(modal, document.body)}
            </>
        )
    } else {
        return buttonFragment
    }
}

ActionButton.Icon = function ActionButtonIcon({ children }) {
    return <>{children}</>
}

ActionButton.Dropdown = function ActionButtonDropdown({ children }) {
    return <>{children}</>
}

ActionButton.Modal = function ActionButtonModal({ children }) {
    return <>{children}</>
}
