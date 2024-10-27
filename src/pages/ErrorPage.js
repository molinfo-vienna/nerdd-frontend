import PropTypes from "prop-types"
import React from "react"

export default function ErrorPage({ errorMessage }) {
    return <div>{errorMessage}</div>
}

ErrorPage.propTypes = {
    errorMessage: PropTypes.string.isRequired,
}
