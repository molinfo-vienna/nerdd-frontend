import { ResultProperty } from "@/types"
import { faker } from "@faker-js/faker"

const problemTypes = [
    "kekulization_error",
    "remove_stereochemistry_failed",
    "incomplete_prediction_error",
    "unknown_preprocessing_error",
    "invalid_elements",
    "invalid_weight",
    "unknown",
    "invalid_smiles",
    "unknown_prediction_error",
    // add a problem that the UI has no icon for
    "this_problem_does_not_exist",
]

function generateProblem() {
    return [
        faker.helpers.arrayElement(problemTypes),
        faker.lorem.words({ min: 1, max: 4 }),
    ]
}

export function generateResultPropertyValue(resultProperty: ResultProperty) {
    if (resultProperty.choices !== undefined) {
        return faker.helpers.arrayElement(resultProperty.choices).value
    } else {
        return generateValue(resultProperty.type)
    }
}

export function generateValue(dataType: string) {
    if (dataType === "string") {
        return faker.lorem.words({ min: 1, max: 4 })
    } else if (dataType === "bool") {
        return faker.datatype.boolean()
    } else if (dataType === "int") {
        return faker.number.int({ min: -100, max: 100 })
    } else if (dataType === "float") {
        return faker.number.float({ min: -100, max: 100 })
    } else if (dataType === "mol") {
        return `/resources/fake/molecules/mol_${faker.number.int({ min: 0, max: 11 })}.svg`
    } else if (dataType === "problem_list") {
        const length = faker.number.int({ min: 0, max: 5 })
        return Array.from({ length }, () => generateProblem())
    } else {
        console.log(dataType)
    }
}
