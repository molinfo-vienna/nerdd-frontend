import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"

export default function FooterLink({ Icon, title, url, ...props }) {
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

FooterLink.propTypes = {
    Icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
}
