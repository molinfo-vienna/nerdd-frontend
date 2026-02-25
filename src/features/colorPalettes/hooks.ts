import { useContext } from "react"
import { ColorPalettesContext } from "./ColorPalettesContext"

export function useColorPalettesContext() {
    const context = useContext(ColorPalettesContext)
    if (context == null) {
        throw new Error(
            "useColorPalettesContext must be used within a ColorPalettesProvider",
        )
    }

    return context
}
