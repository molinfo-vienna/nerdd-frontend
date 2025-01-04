import React from "react"
import Footer from "../features/footer/Footer"
import ModuleHeader from "../features/header/ModuleHeader"
import ErrorPage from "./ErrorPage"
import LoadingPage from "./LoadingPage"

export default function ContactPage() {
    if (error) {
        return ErrorPage({ message: "Error fetching modules", error: error })
    }

    if (isLoading) {
        return LoadingPage()
    }

    return (
        <>
            <ModuleHeader />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-sm-6"></div>
                    <div className="col-sm-4"></div>
                </div>
            </div>

            <Footer />
        </>
    )
}
