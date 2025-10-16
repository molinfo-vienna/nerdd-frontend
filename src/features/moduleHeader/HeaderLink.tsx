import classNames from "classnames"
import { Link } from "react-router-dom"

type HeaderLinkProps = {
    href?: string
    Icon: React.ComponentType<{ size?: number }>
    caption: string
    active?: boolean
}

export default function HeaderLink({
    href,
    Icon,
    caption,
    active = false,
}: HeaderLinkProps) {
    return href !== undefined ? (
        <Link
            className={classNames("text-decoration-none my-auto me-4", {
                "fw-bold": active,
            })}
            to={href}
        >
            <Icon size={15} />
            <span className="ms-1">{caption}</span>
        </Link>
    ) : (
        <div className="my-auto d-block">{caption}</div>
    )
}
