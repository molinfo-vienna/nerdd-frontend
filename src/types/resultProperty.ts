export type Level = "molecule" | "atom" | "derivative"

export interface ResultProperty {
    name: string
    type?: string
    visibleName: string
    precision?: number
    group: string
    level: Level
    visible: boolean
    colorPalette?: string
    sortable: boolean
}

export default ResultProperty
