import { createContext } from "react"
import { ColorScale, PaletteMap } from "./generators/types"

export type ColorPalettesContextValue = {
    propertyPalettes: PaletteMap
    getPalette: (propertyName?: string) => ColorScale | undefined
    getColor: (propertyName: string, value: unknown) => string | undefined
}

export const ColorPalettesContext =
    createContext<ColorPalettesContextValue | null>(null)
