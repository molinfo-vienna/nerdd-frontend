import { Link } from "react-router-dom"
import Icon from "../icon/Icon"
import "./style.scss"

interface ButtonProps {
    href?: string
    className?: string
    icon?: string
    caption?: string
    [key: string]: any // For additional props
}

export default function Button({
    href,
    className,
    icon,
    caption,
    ...props
}: ButtonProps) {
    // merge props with default values
    const mergedProps = {
        className:
            "header-button text-center m-2 text-primary " + (className ?? ""),
        ...props,
    }

    return (
        <div {...mergedProps}>
            {href !== undefined ? (
                <Link
                    className="text-decoration-none text-reset my-auto py-4 d-block"
                    to={href}
                >
                    <p className="mb-1">
                        <Icon name={icon} size={35} />
                    </p>
                    <span>{caption}</span>
                </Link>
            ) : (
                <div className="my-auto d-block">{caption}</div>
            )}
        </div>
    )
}
