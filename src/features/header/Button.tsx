import { type FC } from "react"
import { Link } from "react-router-dom"
import "./style.scss"

interface ButtonProps {
    Icon: FC<any>
    href?: string
    className?: string
    icon?: string
    caption?: string
}

export default function Button({
    Icon,
    href,
    className,
    icon,
    caption,
}: ButtonProps) {
    // merge props with default values
    // TODO: use classNames
    const mergedProps = {
        className:
            "header-button text-center m-2 text-primary " + (className ?? ""),
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
