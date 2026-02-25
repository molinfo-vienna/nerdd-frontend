import * as d3 from "d3"
import { nullPalette } from "./null"
import type { ColorDictionary, PaletteGenerator } from "./types"
import { lighten } from "./util"

export const nerddPaletteGenerator: PaletteGenerator = () => {
    const rootStyles = getComputedStyle(document.documentElement)

    const positive = rootStyles.getPropertyValue("--bs-primary")
    const neutral = rootStyles.getPropertyValue("--bs-tertiary-bg")
    const negative = rootStyles.getPropertyValue("--bs-danger")

    const blue = rootStyles.getPropertyValue("--bs-blue")
    const indigo = rootStyles.getPropertyValue("--bs-indigo")
    const purple = rootStyles.getPropertyValue("--bs-purple")
    const pink = rootStyles.getPropertyValue("--bs-pink")
    const red = rootStyles.getPropertyValue("--bs-red")
    const orange = rootStyles.getPropertyValue("--bs-orange")
    const yellow = rootStyles.getPropertyValue("--bs-yellow")
    const green = rootStyles.getPropertyValue("--bs-green")
    const teal = rootStyles.getPropertyValue("--bs-teal")
    const cyan = rootStyles.getPropertyValue("--bs-cyan")
    const black = rootStyles.getPropertyValue("--bs-black")
    const white = rootStyles.getPropertyValue("--bs-white")
    const gray = rootStyles.getPropertyValue("--bs-gray")

    const colors = Object.entries({
        positive,
        neutral,
        negative,
        blue,
        indigo,
        purple,
        pink,
        red,
        orange,
        yellow,
        green,
        teal,
        cyan,
        black,
        white,
        gray,
    }).reduce<ColorDictionary>((acc, [key, value]) => {
        acc[key] = lighten(value)
        return acc
    }, {})

    return {
        null: nullPalette,
        interpolators: {},
        colors: {
            positive,
            neutral,
            negative,
            ...colors,
        },
        diverging: {
            default: d3.scaleDiverging([negative, neutral, positive]),
        },
        sequential: {
            default: d3.scaleSequential([neutral, positive]),
        },
        categorical: {
            default: d3.scaleOrdinal(
                [
                    "blue",
                    "orange",
                    "green",
                    "red",
                    "purple",
                    "teal",
                    "pink",
                    "gray",
                    "yellow",
                    "cyan",
                ].map((color) => colors[color]),
            ),
        },
    }
}
