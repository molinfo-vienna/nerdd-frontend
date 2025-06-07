import { NerddError } from "@/app/errors"
import classNames from "classnames"
import { BsExclamationCircle } from "react-icons/bs"
import Layout from "./Layout"

type ErrorPageProps = {
    error: NerddError
}

export default function ErrorPage({ error }: ErrorPageProps) {
    // pad the status code to 3 digits, e.g. 20 -> 020
    const statusString = error.status.toString().padStart(3, "0")

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-auto mt-5 pt-5">
                        <div
                            // align-items-center: the error message is centered with respect
                            //   to the icon (if there is no explanation text provided, there is
                            //   not enough text and it looks weird).
                            className={classNames(
                                `d-flex flex-row align-items-center`,
                                {
                                    "align-items-center":
                                        error.explanation === undefined,
                                },
                            )}
                        >
                            <div className="px-4">
                                <p className="mb-0">
                                    <BsExclamationCircle size={120} />
                                </p>
                            </div>
                            <div>
                                <p className="text-danger fw-bold mb-0">
                                    {statusString}: {error.statusText}
                                </p>
                                <h1>{error.message}</h1>
                                {error.explanation !== undefined && (
                                    <p>{error.explanation}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
