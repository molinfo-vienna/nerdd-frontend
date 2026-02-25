import { d3PaletteGenerator } from "./d3"
import { nerddPaletteGenerator } from "./nerdd"
import { nullPalette } from "./null"
import type { PaletteGenerator } from "./types"

export { nullPalette } from "./null"

export const paletteGenerator: PaletteGenerator = () => {
    const defaultPalettes = nerddPaletteGenerator()
    const d3Palettes = d3PaletteGenerator()

    // Merge the palettes
    return {
        null: nullPalette,
        interpolators: {
            ...d3Palettes.interpolators,
        },
        colors: {
            ...d3Palettes.colors,
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
    }
}
