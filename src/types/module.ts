import type { JobParameter } from "./jobParameter"
import type { Partner } from "./partner"
import type { Publication } from "./publication"
import type { ResultProperty } from "./resultProperty"

export type PredictionTask =
    | "molecular_property_prediction"
    | "atom_property_prediction"
    | "derivative_property_prediction"

export interface Module {
    id: string
    name: string
    title: string
    visibleName: string
    logo: string
    logoCaption?: string
    exampleSmiles?: string
    description?: string
    task: PredictionTask
    publications: Publication[]
    jobParameters: JobParameter[]
    resultProperties: ResultProperty[]
    partners: Partner[]
}

export default Module
