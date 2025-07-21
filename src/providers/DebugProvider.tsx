import { lazy, PropsWithChildren, ReactNode } from "react"

type DebugProviderProps = {
    children: ReactNode
}

const Debug =
    import.meta.env.MODE === "development"
        ? lazy(() => import("@/features/debug/Debug"))
        : ({ children }: PropsWithChildren) => <>{children}</>

export default function DebugProvider({ children }: DebugProviderProps) {
    return <Debug>{children}</Debug>
}
