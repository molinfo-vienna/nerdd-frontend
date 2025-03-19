import { createContext, type ReactNode, useContext } from "react"
import Debug from "./Debug"

const DebugContext = createContext(false)

export const useDebug = () => useContext(DebugContext)

type DebugProviderProps = {
    children: ReactNode;
}

export const DebugProvider = ({ children }: DebugProviderProps) => {
    const isDebug = import.meta.env.MODE === "development"
    return (
        <DebugContext.Provider value={isDebug}>
            {isDebug && <Debug />}
            {children}
        </DebugContext.Provider>
    )
}
