import { faker } from "@faker-js/faker"
import { generateResultPropertyValue } from "./util"

export function generateMolecularPropertyPredictionResult(module, moleculeId) {
    const nameValuePairs = module.result_properties.map((resultProperty) => [
        resultProperty.name,
        generateResultPropertyValue(resultProperty),
    ])

    const entry = {
        id: moleculeId,
        mol_id: moleculeId,
        ...Object.fromEntries(nameValuePairs),
    }

    return [entry]
}

export function generateAtomPropertyPredictionResult(module, moleculeId) {
    // generate a single molecular property prediction result (for the molecule)
    const moleculeProperties = module.result_properties.filter(
        (resultProperty) =>
            resultProperty.level === "molecule" ||
            resultProperty.level === undefined,
    )

    const restrictedModule = {
        ...module,
        result_properties: moleculeProperties,
    }

    const moleculeValues = generateMolecularPropertyPredictionResult(
        restrictedModule,
        moleculeId,
    )[0]

    // generate a random number of atoms
    const numAtoms = faker.number.int({ min: 1, max: 50 })

    return Array.from({ length: numAtoms }, (_, i) => ({
        ...generateMolecularPropertyPredictionResult(module, i)[0],
        ...moleculeValues,
        atom_id: i,
        id: `${moleculeId}_${i}`,
    }))
}

export function generateDerivativePredictionResult(module, moleculeId) {
    // generate a single molecular property prediction result (for the molecule)
    const moleculeProperties = module.result_properties.filter(
        (resultProperty) =>
            resultProperty.level === "molecule" ||
            resultProperty.level === undefined,
    )
    const restrictedModule = {
        ...module,
        result_properties: moleculeProperties,
    }

    const moleculeValues = generateMolecularPropertyPredictionResult(
        restrictedModule,
        moleculeId,
    )[0]

    // generate a random number of derivatives
    const numDerivatives = faker.number.int({ min: 1, max: 30 })

    return Array.from({ length: numDerivatives }, (_, i) => ({
        ...generateMolecularPropertyPredictionResult(module, i)[0],
        ...moleculeValues,
        derivative_id: i,
        id: `${moleculeId}_${i}`,
    }))
}

export function generateResult(module, i) {
    faker.seed(i)

    if (module.task === "molecular_property_prediction") {
        return generateMolecularPropertyPredictionResult(module, i)
    } else if (module.task === "atom_property_prediction") {
        return generateAtomPropertyPredictionResult(module, i)
    } else if (module.task === "derivative_property_prediction") {
        return generateDerivativePredictionResult(module, i)
    } else {
        throw new Error(`Unknown task: ${module.task}`)
    }
}

export function generateResults(module, start, numResults) {
    return Array.from({ length: numResults }, (_, i) =>
        generateResult(module, start + i),
    ).flat()
}
