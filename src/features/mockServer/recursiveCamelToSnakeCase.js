// Convert object keys from camelCase to snake_case (recursively).
// Stolen from: https://stackoverflow.com/questions/59769649/recursively-convert-an-object-fields-from-snake-case-to-camelcase
export default function recursiveCamelToSnakeCase(item) {
    if (Array.isArray(item)) {
        return item.map((el) => recursiveCamelToSnakeCase(el))
    } else if (typeof item === "function" || item !== Object(item)) {
        return item
    }
    return Object.fromEntries(
        Object.entries(item).map(([key, value]) => [
            key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
            recursiveCamelToSnakeCase(value),
        ]),
    )
}
