import type { ScaleDiverging, ScaleOrdinal, ScaleSequential } from "d3-scale"

export type Interpolator = (t: number) => string | undefined

export type OrdinalColorScale = ScaleOrdinal<string, string | undefined>

export type SequentialColorScale = ScaleSequential<
    string | undefined,
    string | undefined
>

export type DivergingColorScale = ScaleDiverging<
    string | undefined,
    string | undefined
>

export type ColorScale =
    | OrdinalColorScale
    | SequentialColorScale
    | DivergingColorScale

export type PaletteMap = Record<string, ColorScale>

export type InterpolatorMap = Record<string, Interpolator>

export type ColorDictionary = Record<string, string>

export type ColorPalettes = {
    null: ColorScale
    interpolators: InterpolatorMap
    colors: ColorDictionary
    categorical: PaletteMap
    sequential: PaletteMap
    diverging: PaletteMap
}

export type PaletteGenerator = () => ColorPalettes
