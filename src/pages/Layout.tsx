import Footer from "@/features/footer/Footer"
import NavigationBar from "@/features/navigationBar/NavigationBar"
import { Children, type FC, type ReactNode } from "react"

type LayoutProps = {
    children: ReactNode
}

interface LayoutComponent extends FC<LayoutProps> {
    Header: FC<{ children: ReactNode }>
}

const Layout: LayoutComponent = ({ children }) => {
    // const developmentVersion = ["localhost", "dev-nerdd.univie.ac.at"].includes(
    //     window.location.hostname,
    // )
    const developmentVersion = true

    const childrenArray = Children.toArray(children)

    // check if children contains Layout.Header
    const header = childrenArray.find(
        (child: any) => child.type === Layout.Header,
    )

    const hasHeader = header !== undefined

    const content = childrenArray.filter(
        (child: any) => child.type !== Layout.Header,
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
