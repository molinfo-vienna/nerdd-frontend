import PropTypes from "prop-types"
import React from "react"

export default function ErrorPage({ message, error }) {
    return (
        <div>
            {message} {JSON.stringify(error)}
        </div>
    )
}

ErrorPage.propTypes = {
    message: PropTypes.string.isRequired,
    error: PropTypes.object,
}
