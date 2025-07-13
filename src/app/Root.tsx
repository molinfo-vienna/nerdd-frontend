import { lazy, Suspense } from "react"
import { Outlet } from "react-router-dom"

const Debug =
    import.meta.env.MODE === "development"
        ? lazy(() => import("@/features/debug/Debug"))
        : () => <></>

export default function Root() {
    return (
        <>
            <Outlet />
            <Suspense>
                <Debug />
            </Suspense>
        </>
    )
}
