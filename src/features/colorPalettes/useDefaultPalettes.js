import * as d3 from "d3"
import { useEffect, useState } from "react"
import { mix } from "./util"

const nullPalette = d3.scaleOrdinal().range([undefined])

const weight = 40

const lighten = (color) => mix("#ffffff", color, weight)

let instance = {
    null: nullPalette,
    colors: {},
    categorical: { default: nullPalette },
    diverging: { default: nullPalette },
    sequential: { default: nullPalette },
}
const subscribers = new Set()

export default function useDefaultPalettes() {
    // we change the following state if we would like to force a "rerender" of this hook
    // (-> all components using this hook get the new instance)
    const [, forceRender] = useState({})

    useEffect(() => {
        // add this component to subscribers
        const subscription = () => forceRender({})
        subscribers.add(subscription)

        const rootStyles = getComputedStyle(document.documentElement)

        const positive = rootStyles.getPropertyValue("--bs-primary")
        const neutral = rootStyles.getPropertyValue("--bs-body-bg")
        const negative = rootStyles.getPropertyValue("--bs-danger")

        const blue = rootStyles.getPropertyValue("--bs-blue")
        const indigo = rootStyles.getPropertyValue("--bs-indigo")
        const purple = rootStyles.getPropertyValue("--bs-purple")
        const pink = rootStyles.getPropertyValue("--bs-pink")
        const red = rootStyles.getPropertyValue("--bs-red")
        const orange = rootStyles.getPropertyValue("--bs-orange")
        const yellow = rootStyles.getPropertyValue("--bs-yellow")
        const green = rootStyles.getPropertyValue("--bs-green")
        const teal = rootStyles.getPropertyValue("--bs-teal")
        const cyan = rootStyles.getPropertyValue("--bs-cyan")
        const black = rootStyles.getPropertyValue("--bs-black")
        const white = rootStyles.getPropertyValue("--bs-white")
        const gray = rootStyles.getPropertyValue("--bs-gray")

        // lighten all colors for use as background colors
        const colors = Object.entries({
            positive,
            neutral,
            negative,
            blue,
            indigo,
            purple,
            pink,
            red,
            orange,
            yellow,
            green,
            teal,
            cyan,
            black,
            white,
            gray,
        }).reduce((acc, [key, value]) => {
            acc[key] = lighten(value)
            return acc
        }, {})

        instance = {
            null: nullPalette,
            colors: {
                positive,
                neutral,
                negative,
                ...colors,
            },
            diverging: {
                default: d3.scaleDiverging([negative, neutral, positive]),
            },
            sequential: {
                default: d3.scaleSequential([neutral, positive]),
            },
            categorical: {
                default: d3.scaleOrdinal(
                    [
                        "blue",
                        "orange",
                        "green",
                        "red",
                        "purple",
                        "teal",
                        "pink",
                        "gray",
                        "yellow",
                        "cyan",
                    ].map((color) => colors[color]),
                ),
            },
        }

        // notify all components using this singleton
        subscribers.forEach((notify) => notify())

        // clean up
        return () => {
            subscribers.delete(subscription)
        }
    }, [])

    return instance
}
