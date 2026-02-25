export type Level = "molecule" | "atom" | "derivative"

export interface Choice {
    value: string
    label: string
}

export type PaletteType = "categorical" | "sequential" | "diverging"

export type DomainSpec = unknown[]

export type RangeSpec = string | unknown[]

export type ColorPaletteSpec = {
    type?: PaletteType
    domain?: DomainSpec
    range?: RangeSpec
}

export interface ResultProperty {
    name: string
    type: string
    visibleName: string
    precision?: number
    group: string
    level: Level
    visible: boolean
    choices?: Choice[]
    colorPalette?: string | ColorPaletteSpec
    sortable: boolean
}

export default ResultProperty
