import { createContext, useContext } from "react"

export const DebugContext = createContext(false)

export const useDebug = () => useContext(DebugContext)
