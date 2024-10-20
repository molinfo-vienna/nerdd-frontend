import { faker } from "@faker-js/faker"

export function sourceId() {
    return faker.string.uuid()
}
