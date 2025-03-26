import type { JobParameter } from "./jobParameter"
import type { Partner } from "./partner"
import type { Publication } from "./publication"
import type { ResultProperty } from "./resultProperty"

export interface Module {
    id: string
    name: string
    title: string
    visibleName: string
    logo: string
    logoCaption?: string
    exampleSmiles?: string
    description?: string
    task?: string
    publications: Publication[]
    jobParameters: JobParameter[]
    resultProperties: ResultProperty[]
    partners: Partner[]
}

export default Module
