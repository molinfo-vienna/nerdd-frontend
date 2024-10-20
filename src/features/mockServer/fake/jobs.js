import { faker } from "@faker-js/faker"

export function jobId() {
    return faker.string.uuid()
}
