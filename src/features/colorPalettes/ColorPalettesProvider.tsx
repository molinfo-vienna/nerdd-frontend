import {
    nullPalette,
    paletteGenerator,
} from "@/features/colorPalettes/generators"
import type { ColorPalettes } from "@/features/colorPalettes/generators/types"
import getPaletteFromResultProperty from "@/features/colorPalettes/getPaletteFromResultProperty"
import type { ResultProperty } from "@/types"
import { useEffect, useMemo, useState } from "react"
import {
    ColorPalettesContext,
    ColorPalettesContextValue,
} from "./ColorPalettesContext"

type ColorPalettesProviderProps = {
    resultProperties: ResultProperty[]
    children: React.ReactNode
}

export function ColorPalettesProvider({
    resultProperties,
    children,
}: ColorPalettesProviderProps) {
    const [palettes, setPalettes] = useState<ColorPalettes | null>(null)

    // Some palette generators need to run after mounting the component, because they need access to
    // the DOM (e.g. to read CSS variables). This is ensured by useEffect.
    useEffect(() => {
        setPalettes(paletteGenerator())
    }, [])

    const contextValue: ColorPalettesContextValue = useMemo(() => {
        const propertyPalettes =
            palettes == null
                ? {}
                : Object.fromEntries(
                      resultProperties.map((resultProperty) => [
                          resultProperty.name,
                          getPaletteFromResultProperty(
                              palettes,
                              resultProperty,
                          ),
                      ]),
                  )

        return {
            propertyPalettes,
            getPalette: (propertyName?: string) =>
                propertyName != null &&
                Object.keys(propertyPalettes).includes(propertyName)
                    ? propertyPalettes[propertyName]
                    : nullPalette,
            getColor: (propertyName: string, value: unknown) => {
                const colorScale = propertyPalettes[propertyName] ?? nullPalette

                return colorScale(value)
            },
        }
    }, [resultProperties, palettes])

    return (
        <ColorPalettesContext.Provider value={contextValue}>
            {children}
        </ColorPalettesContext.Provider>
    )
}
