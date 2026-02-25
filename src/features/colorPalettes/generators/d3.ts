import * as d3 from "d3"
import type { InterpolatorMap, PaletteGenerator, PaletteMap } from "./types"

const d3Schemes: Record<string, readonly string[]> = {
    category10: d3.schemeCategory10,
    accent: d3.schemeAccent,
    dark2: d3.schemeDark2,
    paired: d3.schemePaired,
    pastel1: d3.schemePastel1,
    pastel2: d3.schemePastel2,
    set1: d3.schemeSet1,
    set2: d3.schemeSet2,
    set3: d3.schemeSet3,
    tableau10: d3.schemeTableau10,
}

const d3SequentialInterpolators: InterpolatorMap = {
    // Sequential single-hue
    blues: d3.interpolateBlues,
    greens: d3.interpolateGreens,
    greys: d3.interpolateGreys,
    oranges: d3.interpolateOranges,
    purples: d3.interpolatePurples,
    reds: d3.interpolateReds,

    // Sequential multi-hue
    turbo: d3.interpolateTurbo,
    viridis: d3.interpolateViridis,
    inferno: d3.interpolateInferno,
    magma: d3.interpolateMagma,
    plasma: d3.interpolatePlasma,
    cividis: d3.interpolateCividis,
    warm: d3.interpolateWarm,
    cool: d3.interpolateCool,

    // Sequential multi-hue, two-tone
    bugn: d3.interpolateBuGn,
    bupu: d3.interpolateBuPu,
    gnbu: d3.interpolateGnBu,
    orrd: d3.interpolateOrRd,
    pubugn: d3.interpolatePuBuGn,
    pubu: d3.interpolatePuBu,
    purd: d3.interpolatePuRd,
    rdpu: d3.interpolateRdPu,
    ylgnbu: d3.interpolateYlGnBu,
    ylgn: d3.interpolateYlGn,
    ylorbr: d3.interpolateYlOrBr,
    ylorrd: d3.interpolateYlOrRd,
}

const d3DivergingInterpolators: InterpolatorMap = {
    // Diverging
    brbg: d3.interpolateBrBG,
    prgn: d3.interpolatePRGn,
    piyg: d3.interpolatePiYG,
    puor: d3.interpolatePuOr,
    rdbu: d3.interpolateRdBu,
    rdgy: d3.interpolateRdGy,
    rdylbu: d3.interpolateRdYlBu,
    rdylgn: d3.interpolateRdYlGn,
    spectral: d3.interpolateSpectral,
}

const d3Interpolators: InterpolatorMap = {
    ...d3SequentialInterpolators,
    ...d3DivergingInterpolators,
}

//
// convert schemes and interpolators to d3 scales (color palettes)
//
const categoricalPalettes = Object.entries(d3Schemes).reduce<PaletteMap>(
    (acc, [key, value]) => {
        acc[key] = d3.scaleOrdinal(value)
        return acc
    },
    {},
)

const sequentialPalettes = Object.entries(
    d3SequentialInterpolators,
).reduce<PaletteMap>((acc, [key, value]) => {
    acc[key] = d3.scaleSequential(value)
    return acc
}, {})

const divergingPalettes = Object.entries(
    d3DivergingInterpolators,
).reduce<PaletteMap>((acc, [key, value]) => {
    acc[key] = d3.scaleDiverging(value)
    return acc
}, {})

export const d3PaletteGenerator: PaletteGenerator = () => ({
    null: d3.scaleOrdinal<string, undefined>().range([undefined]),
    colors: {},
    interpolators: {
        ...d3Interpolators,
    },
    diverging: {
        ...divergingPalettes,
    },
    sequential: {
        ...sequentialPalettes,
    },
    categorical: {
        ...categoricalPalettes,
    },
})
