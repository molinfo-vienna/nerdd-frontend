import Footer from "@/features/footer/Footer"
import NavigationBar from "@/features/navigationBar/NavigationBar"
import { Children, useEffect, type ReactNode } from "react"
import { useLocation } from "react-router-dom"

type LayoutProps = {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    // const developmentVersion = ["localhost", "dev-nerdd.univie.ac.at"].includes(
    //     window.location.hostname,
    // )
    const developmentVersion = true

    //
    // whenever the route changes, scroll to the top of the page
    //
    const { pathname, hash } = useLocation()

    useEffect(() => {
        // window.scrollTo(0, 0) does not work here, because the browser
        // scrolls to the top of the page before the new content is rendered
        // -> use setTimeout to scroll after the new content is rendered
        if (hash === "") {
            setTimeout(() => window.scrollTo(0, 0), 0)
        }
    }, [pathname, hash])

    //
    // check if children contains Layout.Header
    //
    const childrenArray = Children.toArray(children)
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

                <main className="d-flex flex-fill flex-column">{content}</main>
            </div>

            <Footer />
        </>
    )
}

Layout.Header = function Header({ children }: { children: ReactNode }) {
    return children
}

export default Layout
