import PropTypes from "prop-types"
import React from "react"
import Footer from "../features/footer/Footer"
import NavigationBar from "../features/navigationBar/NavigationBar"

export default function Layout({ children }) {
    // const developmentVersion = ["localhost", "dev-nerdd.univie.ac.at"].includes(
    //     window.location.hostname,
    // )
    const developmentVersion = true

    const childrenArray = React.Children.toArray(children)

    // check if children contains Layout.Header
    const header = childrenArray.find((child) => child.type === Layout.Header)

    const hasHeader = header !== undefined

    const content = childrenArray.filter(
        (child) => child.type !== Layout.Header,
    )

    return (
        <>
            {/* min-vh-100: content fills screen and scrolling down reveals footer */}
            <div className="d-flex flex-column min-vh-100">
                {developmentVersion && (
                    <div className="text-center bg-danger-subtle px-3 py-2">
                        This is the development version of NERDD. It could be
                        unstable and predictions may be deleted at any time.
                    </div>
                )}

                {/* show navigation bar without background if no header is specified */}
                {!hasHeader && <NavigationBar />}

                {/* show navigation bar and header content on background color */}
                {hasHeader && (
                    <header className="bg-body-tertiary">
                        <NavigationBar />
                        {header}
                    </header>
                )}

                <main className="d-flex flex-fill">{content}</main>
            </div>

            <Footer />
        </>
    )
}

Layout.Header = function Header({ children }) {
    return children
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}
