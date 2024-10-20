import { faker } from "@faker-js/faker"

export function generateResultPropertyValue(resultProperty) {
    if (resultProperty.type === "text") {
        return faker.lorem.words({ min: 10, max: 20 })
    } else if (resultProperty.type === "string") {
        return faker.lorem.words({ min: 1, max: 4 })
    } else if (resultProperty.type === "boolean") {
        return faker.datatype.boolean()
    } else if (resultProperty.type === "integer") {
        return faker.number.int({ min: -100, max: 100 })
    } else if (resultProperty.type === "float") {
        return faker.number.float({ min: -100, max: 100 })
    } else if (resultProperty.type === "image") {
        return `/fake/molecules/mol_${faker.number.int({ min: 0, max: 11 })}.svg`
    } else {
        console.log(resultProperty)
    }
}

export function generateMolecularPropertyPredictionResult(module, moleculeId) {
    const nameValuePairs = module.result_properties.map((resultProperty) => [
        resultProperty.name,
        generateResultPropertyValue(resultProperty),
    ])

    const entry = {
        id: moleculeId,
        ...Object.fromEntries(nameValuePairs),
    }

    return [entry]
}

export function generateAtomPropertyPredictionResult(module, moleculeId) {
    // generate a single molecular property prediction result (for the molecule)
    const moleculeProperties = generateMolecularPropertyPredictionResult(
        module,
        moleculeId,
    )[0]

    // generate a random number of atoms
    const numAtoms = faker.number.int({ min: 1, max: 50 })

    return Array.from({ length: numAtoms }, (_, i) => ({
        ...moleculeProperties,
        ...generateMolecularPropertyPredictionResult(module, moleculeId)[0],
        atom_id: i,
    }))
}

export function generateDerivativePredictionResult(module, moleculeId) {
    // generate a single molecular property prediction result (for the molecule)
    const moleculeProperties = generateMolecularPropertyPredictionResult(
        module,
        moleculeId,
    )[0]

    // generate a random number of derivatives
    const numDerivatives = faker.number.int({ min: 1, max: 30 })

    return Array.from({ length: numDerivatives }, (_, i) => ({
        ...moleculeProperties,
        ...generateMolecularPropertyPredictionResult(module, moleculeId)[0],
        derivative_id: i,
    }))
}

export function generateResult(module, i) {
    faker.seed(i)

    if (module.task === "molecular_property_prediction") {
        return generateMolecularPropertyPredictionResult(module, i)
    }
    if (module.task === "atom_property_prediction") {
        return generateAtomPropertyPredictionResult(module, i)
    }
    if (module.task === "derivative_prediction") {
        return generateDerivativePredictionResult(module, i)
    }
}

export function generateResults(module, start, numResults) {
    return Array.from({ length: numResults }, (_, i) =>
        generateResult(module, start + i),
    ).flat()
}
