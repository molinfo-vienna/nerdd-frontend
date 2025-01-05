import { faker } from "@faker-js/faker"

export function generateValue(dataType) {
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
    } else {
        console.log(dataType)
    }
}
