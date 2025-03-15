import { useMemo } from "react"
import d3Palettes from "./d3Palettes"
import useDefaultPalettes from "./useDefaultPalettes"

export default function useColorPalettes() {
    const defaultPalettes = useDefaultPalettes()

    const result = useMemo(
        () => ({
            null: defaultPalettes.null,
            interpolators: {
                ...d3Palettes.interpolators,
            },
            colors: {
                ...(d3Palettes.colors ?? {}),
                ...defaultPalettes.colors,
            },
            categorical: {
                ...d3Palettes.categorical,
                ...defaultPalettes.categorical,
            },
            sequential: {
                ...d3Palettes.sequential,
                ...defaultPalettes.sequential,
            },
            diverging: {
                ...d3Palettes.diverging,
                ...defaultPalettes.diverging,
            },
        }),
        [defaultPalettes],
    )

    return result
}
