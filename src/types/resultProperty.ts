export type Level = "molecule" | "atom" | "derivative"

export interface Choice {
    value: string
    label: string
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
    colorPalette?: string
    sortable: boolean
}

export default ResultProperty
