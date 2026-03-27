import classNames from "classnames"
import { useMemo } from "react"
import MoleculePlaceholder from "./MoleculePlaceholder"
import "./MoleculeIllustration.scss"

export type MoleculeIllustrationProps = {
    svgText?: string | null
    className?: string
}

const ELEMENT_CLASSES: Record<string, string> = {
    C: "text-carbon",
    N: "text-nitrogen",
    O: "text-oxygen",
    S: "text-sulfur",
    P: "text-phosphorus",
    Cl: "text-chlorine",
    F: "text-fluorine",
    H: "text-hydrogen",
}

const MOLECULE_SCALE = 1.0
const MOLECULE_OFFSET_X = 280 - 200 * MOLECULE_SCALE
const MOLECULE_OFFSET_Y = 270 - 150 * MOLECULE_SCALE

type ReactiveCenter = {
    x: number
    y: number
    symbol: string
}

export default function MoleculeIllustration({
    svgText,
    className,
}: MoleculeIllustrationProps) {
    const { reactiveCenter, bondLength, svgContent } = useMemo(() => {
        if (!svgText) {
            return {
                reactiveCenter: null,
                bondLength: 20,
                svgContent: null,
            }
        }

        const parser = new DOMParser()
        const doc = parser.parseFromString(svgText, "image/svg+xml")

        // 1. Reactive atom coordinates & symbol
        const svgEl = doc.querySelector("svg")
        const rx = svgEl?.getAttribute("data-reactive-x")
        const ry = svgEl?.getAttribute("data-reactive-y")
        const symbol = svgEl?.getAttribute("data-reactive-symbol") ?? "C"

        let center: ReactiveCenter | null = null
        if (rx != null && ry != null) {
            const x = parseFloat(rx)
            const y = parseFloat(ry)
            if (!Number.isNaN(x) && !Number.isNaN(y)) {
                center = { x, y, symbol }
            }
        }

        // 2. Measure average bond line length
        const bondPaths = doc.querySelectorAll("path[class*='bond']")
        const lengths: number[] = []

        bondPaths.forEach((path) => {
            const d = path.getAttribute("d")
            if (!d) return

            const coords = d.match(/-?\d+(?:\.\d+)?/g)
            if (!coords || coords.length < 4) return

            let pathLength = 0
            for (let i = 0; i < coords.length - 3; i += 2) {
                const x1 = parseFloat(coords[i])
                const y1 = parseFloat(coords[i + 1])
                const x2 = parseFloat(coords[i + 2])
                const y2 = parseFloat(coords[i + 3])
                pathLength += Math.hypot(x2 - x1, y2 - y1)
            }

            // Filter out tiny stereochemical hash dashes (< 3px)
            if (pathLength >= 3) {
                lengths.push(pathLength)
            }
        })

        let computedBondLength = 20
        if (lengths.length > 0) {
            const avg =
                lengths.reduce((sum, len) => sum + len, 0) / lengths.length
            if (!Number.isNaN(avg)) {
                computedBondLength = Math.round(avg * 10) / 10
            }
        }

        // 3. Extract SVG inner content for inlined rendering so main stylesheet classes apply
        let innerContent: string | null = null
        if (svgEl) {
            const defs = svgEl.querySelector("defs")
            if (defs) {
                defs.remove()
            }
            innerContent = svgEl.innerHTML
        }

        return {
            reactiveCenter: center,
            bondLength: computedBondLength,
            svgContent: innerContent,
        }
    }, [svgText])

    const reactiveCx = reactiveCenter
        ? MOLECULE_OFFSET_X + reactiveCenter.x * MOLECULE_SCALE
        : null
    const reactiveCy = reactiveCenter
        ? MOLECULE_OFFSET_Y + reactiveCenter.y * MOLECULE_SCALE
        : null
    const elementClass = reactiveCenter
        ? (ELEMENT_CLASSES[reactiveCenter.symbol] ?? "text-carbon")
        : undefined

    const scaledBondLength = bondLength * MOLECULE_SCALE
    const baseRadius = Math.round(scaledBondLength * 1.65 * 10) / 10
    const pulseDelta = Math.max(1.5, Math.round(baseRadius * 0.08 * 10) / 10)
    const rMin = Math.round((baseRadius - pulseDelta) * 10) / 10
    const rMax = Math.round((baseRadius + pulseDelta) * 10) / 10

    const isLoading = !svgContent

    return (
        <svg
            className={classNames(
                "molecule-illustration d-block w-100",
                { "molecule-illustration--loading": isLoading },
                className,
            )}
            viewBox="0 0 560 540"
            fill="none"
        >
            <circle
                className="molecule-illustration__halo"
                cx="280"
                cy="270"
                r="218"
            />
            <g className="molecule-illustration__guides">
                <path d="M36 270H524 M280 26V514" />
                <circle cx="280" cy="270" r="192" />
                <path d="M79 91h18m-9-9v18 M463 440h18m-9-9v18" />
            </g>
            {isLoading || !svgContent ? (
                <MoleculePlaceholder />
            ) : (
                <g
                    className="molecule-illustration__molecule"
                    transform={`translate(${MOLECULE_OFFSET_X}, ${MOLECULE_OFFSET_Y}) scale(${MOLECULE_SCALE})`}
                    dangerouslySetInnerHTML={{
                        __html: svgContent,
                    }}
                />
            )}
            {!isLoading && reactiveCx != null && reactiveCy != null && (
                <g
                    className="molecule-illustration__reactive-atom"
                    transform={`translate(${reactiveCx}, ${reactiveCy})`}
                >
                    <circle
                        className={classNames(
                            "molecule-illustration__pulse",
                            elementClass,
                        )}
                        cx="0"
                        cy="0"
                        r={baseRadius}
                    >
                        <animate
                            attributeName="r"
                            values={`${rMin};${rMax};${rMin}`}
                            dur="4s"
                            repeatCount="indefinite"
                            calcMode="spline"
                            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                            keyTimes="0;0.5;1"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.35;0.18;0.35"
                            dur="4s"
                            repeatCount="indefinite"
                            calcMode="spline"
                            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                            keyTimes="0;0.5;1"
                        />
                    </circle>
                </g>
            )}
        </svg>
    )
}
