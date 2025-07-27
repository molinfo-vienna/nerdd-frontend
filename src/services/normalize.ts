import type { JobParameter, Module, ResultProperty } from "@/types"
import { camelCase, upperFirst } from "lodash-es"

function normalizeJobParameter(jobParameter): JobParameter {
    return {
        ...jobParameter,
        visibleName:
            jobParameter.visibleName ||
            upperFirst(camelCase(jobParameter.name)),
        required: jobParameter.required || false,
    }
}

function normalizeResultProperty(resultProperty): ResultProperty {
    return {
        ...resultProperty,
        visibleName:
            resultProperty.visibleName ||
            upperFirst(camelCase(resultProperty.name)),
        // temporary: force problem list to be invisible at the start
        visible:
            (resultProperty.visible ?? true) &&
            resultProperty.name !== "problems",
        level: resultProperty.level || "molecule",
        group: resultProperty.group || "General",
    }
}

export function normalizeModule(module): Module {
    const task = module.task ?? "molecular_property_prediction"

    const exampleSmiles =
        module.exampleSmiles ??
        "CN1CCN(Cc2ccc(cc2)C(=O)Nc3ccc(C)c(Nc4nccc(n4)c5cccnc5)c3)CC1 example smiles"

    const jobParameters = (module.jobParameters || []).map(
        normalizeJobParameter,
    )

    const resultProperties = (module.resultProperties || [])?.map(
        normalizeResultProperty,
    )

    return {
        ...module,
        rank: module.rank || 0,
        visibleName: module.visibleName || upperFirst(camelCase(module.name)),
        task,
        exampleSmiles,
        publications: module.publications || [],
        jobParameters,
        resultProperties,
        partners: module.partners || [],
    }
}
