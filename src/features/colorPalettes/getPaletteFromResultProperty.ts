import type { DomainSpec, PaletteType, ResultProperty } from "@/types"
import * as d3 from "d3"
import type { ColorPalettes, ColorScale } from "./generators/types"

const toOrdinalDomain = (domain: unknown[]) => domain.map((value) => `${value}`)

const toNumericDomain = (domain: unknown[]) =>
    domain.map((value) => Number(value))

const toRangeColors = (range: unknown[], palettes: ColorPalettes) =>
    range.map((value) => {
        if (typeof value !== "string") {
            return `${value}`
        }

        if (Object.keys(palettes.colors).includes(value)) {
            return palettes.colors[value]
        }

        return value
    })

const applyDomainToScale = (
    scale: ColorScale,
    type: PaletteType,
    domain: unknown[],
): ColorScale => {
    if (type === "categorical") {
        return scale.domain(toOrdinalDomain(domain)) as ColorScale
    }

    return scale.domain(toNumericDomain(domain)) as ColorScale
}

export default function getPaletteFromResultProperty(
    palettes: ColorPalettes,
    resultProperty: ResultProperty,
): ColorScale {
    const colorPaletteValue = resultProperty.colorPalette

    // if no color palette is specified, do not color the column at all
    if (colorPaletteValue == null) {
        return palettes.null
    }

    //
    // Determine the type of the color palette (categorical, sequential, diverging)
    //
    let type: PaletteType = "categorical"
    if (
        // if colorPaletteValue is null, we assume it's a categorical palette
        colorPaletteValue != null &&
        // if colorPaletteValue is a string, we assume it's a categorical palette
        typeof colorPaletteValue !== "string" &&
        // if colorPaletteValue.type is null, we assume it's a categorical palette
        colorPaletteValue.type != null
    ) {
        type = colorPaletteValue.type
    }

    // get the map of color palettes for the given type (categorical, sequential, diverging)
    let paletteGroup
    if (type === "categorical") {
        paletteGroup = palettes.categorical
    } else if (type === "sequential") {
        paletteGroup = palettes.sequential
    } else if (type === "diverging") {
        paletteGroup = palettes.diverging
    } else {
        return palettes.null
    }

    // define default scale for the given type
    const defaultScale = paletteGroup.default ?? palettes.null

    //
    // Determine the domain for the color palette
    //
    let domain: DomainSpec
    if (
        typeof colorPaletteValue !== "string" &&
        colorPaletteValue.domain != null
    ) {
        domain = colorPaletteValue.domain
    } else if (resultProperty.choices != null) {
        // if the property has choices, use the choice values as domain
        domain = resultProperty.choices.map((choice) => choice.value)
    } else if (resultProperty.type === "bool") {
        // if the property is boolean, use [false, true] as domain
        domain = [false, true]
    } else {
        return palettes.null
    }

    //
    // Determine the range for the color palette.
    //
    const range =
        typeof colorPaletteValue === "string"
            ? colorPaletteValue
            : colorPaletteValue.range

    if (range == null) {
        return applyDomainToScale(defaultScale, type, domain)
    } else if (typeof range === "string") {
        const existingScale = paletteGroup[range]
        if (existingScale != null) {
            return applyDomainToScale(existingScale, type, domain)
        } else if (
            type === "categorical" &&
            Object.keys(palettes.interpolators).includes(range)
        ) {
            const interpolator = palettes.interpolators[range]
            const ordinalScale = d3.scaleOrdinal(
                Array.from({ length: domain.length }, (_, i) =>
                    interpolator(i / Math.max(1, domain.length - 1)),
                ),
            )
            return applyDomainToScale(ordinalScale, "categorical", domain)
        } else {
            console.warn(
                `Invalid color palette: ${range} for ${resultProperty.name}`,
            )
            return palettes.null
        }
    } else if (domain.length > range.length) {
        // at this point
        // * domain has to be an array of values
        // * range has to be an array (otherwise we would have returned above)
        console.warn(
            `Domain has more values than range for property ${resultProperty.name}`,
        )
        return palettes.null
    }

    const normalizedRange = toRangeColors(range, palettes)

    //
    // Create the d3 scale based on domain and range.
    //
    if (type === "diverging") {
        return d3.scaleDiverging(
            toNumericDomain(domain),
            normalizedRange,
        ) as ColorScale
    }

    if (type === "sequential") {
        return d3.scaleSequential(
            toNumericDomain(domain),
            normalizedRange,
        ) as ColorScale
    }

    if (type === "categorical") {
        const scale = d3
            .scaleOrdinal(toOrdinalDomain(domain), normalizedRange)
            .unknown(palettes.colors.neutral)
        return scale as ColorScale
    }

    return palettes.null
}
