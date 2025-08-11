export function snakeToCamelCase(str) {
    return str.replace(/([-_][a-z])/gi, (c) =>
        c.toUpperCase().replace(/[-_]/g, ""),
    )
}

// Convert object keys from snake_case to camelCase (recursively).
// Stolen from: https://stackoverflow.com/questions/59769649/recursively-convert-an-object-fields-from-snake-case-to-camelcase
export default function recursiveSnakeToCamelCase(item) {
    if (item === null || item === undefined) {
        return item
    } else if (Array.isArray(item)) {
        return item.map((el) => recursiveSnakeToCamelCase(el))
    } else if (typeof item === "function" || item !== Object(item)) {
        return item
    }
    return Object.fromEntries(
        Object.entries(item).map(([key, value]) => [
            snakeToCamelCase(key),
            recursiveSnakeToCamelCase(value),
        ]),
    )
}
