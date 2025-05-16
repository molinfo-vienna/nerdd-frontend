import * as d3 from "d3"

export default function getColorPalette(palettes, resultProperty) {
    const colorPaletteField = resultProperty.colorPalette

    if (colorPaletteField == null) {
        return palettes.null
    }

    // type
    const type = colorPaletteField.type || "categorical"

    // domain
    let domain = undefined
    if (colorPaletteField.domain != null) {
        domain = colorPaletteField.domain
    } else if (resultProperty.choices != null) {
        domain = resultProperty.choices.map((choice) => choice.label)
    } else if (resultProperty.type === "bool") {
        domain = [false, true]
    } else {
        return palettes.null
    }

    // range
    // is colorPaletteField.range a string?
    let range = colorPaletteField.range
    if (range == null) {
        return palettes[type]["default"].domain(domain)
    } else if (typeof range === "string") {
        let result
        if (Object.keys(palettes[type]).includes(range)) {
            result = palettes[type][range]
        } else if (
            type === "categorical" &&
            Object.keys(palettes.interpolators).includes(range)
        ) {
            const interpolator = palettes.d3Interpolators[range]
            result = d3.scaleOrdinal(
                Array.from({ length: domain.length }, (_, i) =>
                    interpolator(i / (domain.length - 1)),
                ),
            )
        } else {
            console.warn(
                `Invalid color palette: ${range} for ${resultProperty.name}`,
            )
            return palettes.null
        }
        return result.domain(domain)
    } else {
        if (domain.length > range.length) {
            console.warn(
                `Domain has more values than range for property ${resultProperty.name}`,
            )
            return palettes.null
        }

        // decode color names
        const decode = (n) => {
            if (Object.keys(palettes.colors).includes(n)) {
                return palettes.colors[n]
            } else {
                return n
            }
        }
        range = range.map(decode)

        // create final color palette
        let colorPalette
        if (type === "diverging") {
            colorPalette = d3.scaleDiverging(domain, range)
        } else if (type === "sequential") {
            colorPalette = d3.scaleSequential(domain, range)
        } else if (type === "categorical") {
            colorPalette = d3
                .scaleOrdinal(domain, range)
                .unknown(palettes.colors.neutral)
        }

        return colorPalette
    }
}
