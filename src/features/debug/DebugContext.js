import PropTypes from "prop-types"
import { createContext, React, useContext } from "react"
import Debug from "./Debug"

const DebugContext = createContext(false)

export const useDebug = () => useContext(DebugContext)

export const DebugProvider = ({ children }) => {
    const isDebug = process.env.NODE_ENV === "development" // Read from env
    return (
        <DebugContext.Provider value={isDebug}>
            {isDebug && <Debug />}
            {children}
        </DebugContext.Provider>
    )
}

DebugProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
