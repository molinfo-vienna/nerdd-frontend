import { type ComponentType } from "react";
import { Link } from "react-router-dom";

type FooterLinkProps = {
    Icon: ComponentType<{ size?: number; className?: string }>;
    title: string;
    url: string;
    [key: string]: any; // For additional props spread with ...props
}

export default function FooterLink({ Icon, title, url, ...props }: FooterLinkProps) {
    return (
        <li className="mb-2">
            <Link
                className="muted-link d-flex align-items-center"
                to={url}
                {...props}
            >
                <Icon size={18} className="me-2" />
                <span>{title}</span>
            </Link>
        </li>
    )
}
