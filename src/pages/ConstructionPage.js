import React from "react"
import { PiBulldozer } from "react-icons/pi"
import Layout from "./Layout"

export default function ConstructionPage() {
    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-auto mt-5 pt-5">
                        <div
                            // align-items-center: the error message is centered with respect
                            //   to the icon (if there is no explanation text provided, there is
                            //   not enough text and it looks weird).
                            className={`d-flex flex-row align-items-center align-items-center`}
                        >
                            <div
                                className="position-relative mx-4 rounded-circle border border-4 border-dark"
                                style={{ width: "180px", height: "180px" }}
                            >
                                <div
                                    className="position-absolute top-50 start-50 translate-middle"
                                    style={{ width: "120px", height: "120px" }}
                                >
                                    <p className="mb-0">
                                        <PiBulldozer size={120} />
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-danger fw-bold mb-0">
                                    503: Service Unavailable
                                </p>
                                <h1>Coming Soon!</h1>
                                <p>Sorry, this page is under construction.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
