import PropTypes from "prop-types"
import React from "react"
import Footer from "../features/footer/Footer"
import Icon from "../features/icon/Icon"
import NavigationBar from "../features/navigationBar/NavigationBar"

const statusMap = {
    404: "Not Found",
    500: "Internal Server Error",
}

export default function ErrorPage({ error, explanation }) {
    const status = error?.status || "OMG"
    const message = error?.data.detail || "An unknown error occurred"

    const statusExplanation = statusMap[status] || "Unknown Error"

    return (
        <>
            <main className="container vh-100">
                <NavigationBar />
                <div className="row justify-content-center">
                    <div className="col-md-auto mt-5 pt-5">
                        <div
                            // align-items-center: the error message is centered with respect
                            //   to the icon (if there is no explanation text provided, there is
                            //   not enough text and it looks weird).
                            className={`d-flex flex-row align-items-center ${explanation ? "" : "align-items-center"}`}
                        >
                            <div className="px-4">
                                <p className="mb-0">
                                    <Icon
                                        collection="bs"
                                        name="BsExclamationCircle"
                                        size={120}
                                    />
                                </p>
                            </div>
                            <div>
                                <p className="text-danger fw-bold mb-0">
                                    {status}: {statusExplanation}
                                </p>
                                <h1>{message}</h1>
                                {explanation && <p>{explanation}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}

ErrorPage.propTypes = {
    message: PropTypes.string.isRequired,
    error: PropTypes.object,
}
