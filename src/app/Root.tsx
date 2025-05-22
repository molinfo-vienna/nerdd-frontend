import { useDebug } from "@/features/debug/DebugContext"
import { lazy, Suspense } from "react"
import { Outlet } from "react-router-dom"

export default function Root() {
    const isDebug = useDebug()

    const Debug = isDebug
        ? lazy(() => import("@/features/debug/Debug"))
        : () => <></>

    return (
        <>
            <Outlet />
            <Suspense>
                <Debug />
            </Suspense>
        </>
    )
}
