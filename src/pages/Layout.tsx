import Footer from "@/features/footer/Footer"
import NavigationBar from "@/features/navigationBar/NavigationBar"
import { Children, type ReactNode } from "react"

type LayoutProps = {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    // const developmentVersion = ["localhost", "dev-nerdd.univie.ac.at"].includes(
    //     window.location.hostname,
    // )
    const developmentVersion = true

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
        <div className="page d-flex flex-column">
            {/* 
                The class page-content aims to make the footer either 
                a) fully visible (for long screens) or
                b) fully hidden (for short screens).
            */}
            <div className="page-content d-flex flex-column">
                {/* {developmentVersion && (
                    <div className="text-center bg-danger-subtle px-3 py-2">
                        This web service is currently undergoing revision and
                        review. Short disruptions of the system are possible.
                    </div>
                )} */}

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
        </div>
    )
}

Layout.Header = function Header({ children }: { children: ReactNode }) {
    return children
}

export default Layout
