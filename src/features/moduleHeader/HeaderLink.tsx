import { Link } from "react-router-dom"

type HeaderLinkProps = {
    href?: string
    Icon: React.ComponentType<{ size?: number }>
    caption: string
}

export default function HeaderLink({ href, Icon, caption }: HeaderLinkProps) {
    return href !== undefined ? (
        <Link className="text-decoration-none my-auto me-4" to={href}>
            <Icon size={15} />
            <span className="ms-1">{caption}</span>
        </Link>
    ) : (
        <div className="my-auto d-block">{caption}</div>
    )
}
