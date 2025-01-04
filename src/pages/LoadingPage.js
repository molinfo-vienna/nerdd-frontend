import React from "react"
import Footer from "../features/footer/Footer"
import NavigationBar from "../features/navigationBar/NavigationBar"

export default function LoadingPage() {
    return (
        <>
            <NavigationBar />
            <main className="container text-center">
                <div className="row vh-100 align-items-center">
                    <div className="col">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
