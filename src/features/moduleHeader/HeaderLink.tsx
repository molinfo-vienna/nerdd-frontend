import classNames from "classnames"
import { Link } from "react-router-dom"

type HeaderLinkProps = {
    href?: string
    onClick?: () => void
    Icon: React.ComponentType<{ size?: number }>
    caption: string
    active?: boolean
}

export default function HeaderLink({
    href,
    onClick,
    Icon,
    caption,
    active = false,
}: HeaderLinkProps) {
    return href !== undefined || onClick !== undefined ? (
        <Link
            className={classNames("text-decoration-none my-auto me-4", {
                "fw-bold": active,
            })}
            to={href}
            onClick={onClick}
        >
            <Icon size={15} />
            <span className="ms-1">{caption}</span>
        </Link>
    ) : (
        <div className="my-auto d-block">{caption}</div>
    )
}
