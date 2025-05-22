import { DebugContext } from "@/features/debug/DebugContext"
import { ReactNode } from "react"

type DebugProviderProps = {
    children: ReactNode
}

export default function DebugProvider({ children }: DebugProviderProps) {
    const isDebug = import.meta.env.MODE === "development"

    return (
        <DebugContext.Provider value={isDebug}>
            {children}
        </DebugContext.Provider>
    )
}
