import React from "react"
import { Link } from "react-router-dom"
import Icon from "../icon/Icon"

export default function FooterLink({ icon, title, url, ...props }) {
    return (
        <li className="mb-2">
            <Link
                className="muted-link d-flex align-items-center"
                to={url}
                {...props}
            >
                <Icon collection="fa" size={18} name={icon} className="me-2" />
                <span>{title}</span>
            </Link>
        </li>
    )
}
