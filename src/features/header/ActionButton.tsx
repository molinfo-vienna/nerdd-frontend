import classNames from "classnames"
import { Children } from "react"
import { createPortal } from "react-dom"
import { Link, To } from "react-router-dom"

type ActionButtonProps = {
    label: string
    style?: "secondary" | "primary" | "danger" | "success" | "warning" | "info"
    to?: To
    disabled?: boolean
    modalId?: string
    children?: React.ReactNode
}

export default function ActionButton({
    label,
    style = "primary",
    to = "#",
    disabled = false,
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

    const hasDropdown = !!dropdown
    const hasModal = !!modal

    let dataBsToggle = undefined
    if (hasModal) {
        dataBsToggle = "modal"
    } else if (hasDropdown) {
        dataBsToggle = "dropdown"
    }

    const buttonFragment = (
        <Link
            className={classNames(
                "btn text-center text-decoration-none d-inline-block",
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
            <div
                className={classNames(
                    "d-flex flex-column justify-content-end py-2",
                )}
                style={{
                    width: "90px",
                    height: "90px",
                }}
            >
                <span className="mb-2">{icon}</span>
                <span className="mb-1">{label}</span>
            </div>
        </Link>
    )

    if (hasDropdown) {
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
