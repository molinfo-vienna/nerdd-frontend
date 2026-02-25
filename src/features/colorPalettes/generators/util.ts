// convert a decimal value to hex
export function decimal2hex(decimal: string | number): string {
    // Ensure that we return a two digit hex value
    return `0${Number.parseInt(`${decimal}`, 10).toString(16)}`.slice(-2)
}

// convert a hex value to decimal
export function hex2decimal(hex: string): number {
    return Number.parseInt(hex, 16)
}

export function formatHexValue(color: string): string {
    let formattedValue = color.replace(/#/g, "")

    if (formattedValue.length === 3) {
        formattedValue = formattedValue
            .split("")
            // expand the shorthand form to two hex digits
            .map((hex) => `${hex}${hex}`)
            .join("")
    }

    return formattedValue
}

const RGBA_PATTERN = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/

export function rgb2hex(rgbArg: string): string {
    // A very ugly regex that parses a string such as 'rgb(191, 0, 46)' and produces an array
    const rgb = rgbArg.match(RGBA_PATTERN)

    if (!rgb) {
        return rgbArg
    }

    // concatenate the pairs
    return `#${decimal2hex(rgb[1])}${decimal2hex(rgb[2])}${decimal2hex(rgb[3])}`
}

export function mix(color1Arg: string, color2Arg: string, weight = 50): string {
    let color = "#"

    const color1 = formatHexValue(rgb2hex(formatHexValue(color1Arg)))
    const color2 = formatHexValue(rgb2hex(formatHexValue(color2Arg)))

    // loop through each of the 3 hex pairs—red, green, and blue
    for (let i = 0; i <= 5; i += 2) {
        // extract the current pairs
        const value1 = hex2decimal(color1.slice(i, i + 2))
        const value2 = hex2decimal(color2.slice(i, i + 2))

        // combine the current pairs from each source color, according to the specified weight
        let combinedValue = decimal2hex(
            Math.round(value2 + (value1 - value2) * (weight / 100.0)),
        )

        // prepend a '0' if val results in a single digit
        while (combinedValue.length < 2) {
            combinedValue = "0" + combinedValue
        }

        color += combinedValue // concatenate combinedValue to our new color string
    }

    return color
}

export function lighten(color: string, weight = 40): string {
    return mix("#ffffff", color, weight)
}
