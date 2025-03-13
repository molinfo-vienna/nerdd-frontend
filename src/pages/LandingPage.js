import React from "react"
import Footer from "../features/footer/Footer"
import ModuleCard from "../features/moduleCard/ModuleCard"
import NavigationBar from "../features/navigationBar/NavigationBar"
import { useGetModulesQuery } from "../services"
import ErrorPage from "./ErrorPage"
import LoadingPage from "./LoadingPage"

export default function LandingPage() {
    const { data: modules, error, isLoading } = useGetModulesQuery()

    if (error) {
        return ErrorPage({ error })
    }

    // TODO: show a message if there are no modules
    if (isLoading) {
        return LoadingPage()
    } else if (modules === undefined || Object.keys(modules).length === 0) {
        return (
            <ErrorPage
                error={{
                    status: "000",
                    data: { detail: "Modules are not available." },
                }}
            />
        )
    }

    // sort modules alphabetically by name
    const modulesByRank = Object.values(modules).sort((a, b) => {
        if (a.rank < b.rank) {
            return -1
        }
        if (a.rank > b.rank) {
            return 1
        }
        return 0
    })
/*
    const developmentVersion = ["localhost", "dev-nerdd.univie.ac.at"].includes(
        window.location.hostname,
    )
*/
    const developmentVersion = true;

    return (
        <>
            {developmentVersion && (
                <div className="text-center bg-danger-subtle px-3 py-2">
                    This is the development version of NERDD. It could be
                    unstable and predictions may be deleted at any time.
                </div>
            )}
            <NavigationBar />

            {/* min-vh-100: content fills screen and scrolling down reveals footer */}
            <main className="min-vh-100">
                {/* px-4: padding on the left and right side for small screens */}
                <div className="py-5 px-4">
                    <h1 className="text-center">
                        Next-generation E-Resource for Drug Discovery
                    </h1>
                </div>

                {/*
                 * Module grid
                 * - container-fluid: uses full screen width
                 * - px-xxl-5: padding on the left and right side on large screens
                 *     (it looks ugly if the cards stick to the edge of the screen)
                 * - row-cols-auto: columns have width of their content
                 * - gx-4 gx-4: horizontal and vertical gap between columns
                 */}
                <div className="container-fluid px-xxl-5 pb-5">
                    <div className="row justify-content-center row-cols-auto gx-4 gy-4">
                        {modulesByRank.map((module) => (
                            <div key={module.id} className="col">
                                <ModuleCard module={module} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}
