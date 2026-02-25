import * as d3 from "d3"

export const nullPalette = d3
    .scaleOrdinal<string, undefined>()
    .range([undefined])
