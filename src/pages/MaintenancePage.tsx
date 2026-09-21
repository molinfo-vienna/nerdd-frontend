import { NerddError } from "@/app/errors"
import MoleculeIllustration from "@/features/maintenance/MoleculeIllustration"
import { useEffect, useState } from "react"
import { FaArrowRight, FaRotateRight } from "react-icons/fa6"
import Layout from "./Layout"

type MaintenanceMolecule = {
    src: string
    name: string
    title: string
    description: string
}

const MAINTENANCE_SVGS: MaintenanceMolecule[] = [
    {
        src: "/resources/maintenance/dexpanthenol.svg",
        name: "dexpanthenol",
        title: "Dexpanthenol",
        description:
            "is a synthetic provitamin of vitamin B5 that supports skin barrier repair",
    },
    {
        src: "/resources/maintenance/ascorbic_acid.svg",
        name: "ascorbic_acid",
        title: "Ascorbic acid (vitamin C)",
        description: "supports collagen synthesis for tissue repair",
    },
    {
        src: "/resources/maintenance/allantoin.svg",
        name: "allantoin",
        title: "Allantoin",
        description:
            "is used in skin-care products to help soothe, moisturize and protect skin",
    },
    {
        src: "/resources/maintenance/creatine.svg",
        name: "creatine",
        title: "Creatine",
        description:
            "is converted into phosphocreatine to help cells regenerate ATP",
    },
    {
        src: "/resources/maintenance/lipoic_acid.svg",
        name: "lipoic_acid",
        title: "Lipoic acid",
        description: "serves as a cofactor for mitochondrial energy production",
    },
    {
        src: "/resources/maintenance/carnosine.svg",
        name: "carnosine",
        title: "Carnosine",
        description: "helps protect proteins from glycation damage",
    },
    {
        src: "/resources/maintenance/trolox.svg",
        name: "trolox",
        title: "Trolox",
        description:
            "is a synthetic vitamin E analogue that helps protect membrane lipids from oxidation",
    },
    {
        src: "/resources/maintenance/tetrahydrobiopterin.svg",
        name: "tetrahydrobiopterin",
        title: "Tetrahydrobiopterin",
        description: "enables nitric oxide synthesis to support wound healing",
    },
    {
        src: "/resources/maintenance/uridine.svg",
        name: "uridine",
        title: "Uridine",
        description:
            "is a precursor of uracil-containing nucleotides used in RNA synthesis",
    },
    {
        src: "/resources/maintenance/adenosine.svg",
        name: "adenosine",
        title: "Adenosine",
        description: "signals tissue stress and can support wound healing",
    },
    {
        src: "/resources/maintenance/pyridoxamine.svg",
        name: "pyridoxamine",
        title: "Pyridoxamine",
        description:
            "is a form of vitamin B6 that helps protect proteins from glycation damage",
    },
]

const svgCache = new Map<string, string>()

type MaintenancePageProps = {
    error?: NerddError
}

export default function MaintenancePage({ error }: MaintenancePageProps) {
    const status = error?.status ?? 503
    const statusText = error?.statusText || "Service unavailable"

    const [moleculeIndex, setMoleculeIndex] = useState<number>(() =>
        Math.floor(Math.random() * MAINTENANCE_SVGS.length),
    )
    const molecule = MAINTENANCE_SVGS[moleculeIndex]
    const [svgText, setSvgText] = useState<string | null>(
        () => svgCache.get(molecule.src) ?? null,
    )

    // prefetch all SVGs in the background
    useEffect(() => {
        MAINTENANCE_SVGS.forEach((m) => {
            if (!svgCache.has(m.src)) {
                fetch(m.src)
                    .then((res) => res.text())
                    .then((text) => svgCache.set(m.src, text))
                    .catch(() => { })
            }
        })
    }, [])

    useEffect(() => {
        const cached = svgCache.get(molecule.src)
        if (cached) {
            setSvgText(cached)
            return
        }

        let active = true
        setSvgText(null)

        const startTime = Date.now()
        // enforce minimum loading duration on the first/uncached load to prevent a "blink" when switching molecules
        const minLoadingDuration = 400

        fetch(molecule.src)
            .then((res) => res.text())
            .then((text) => {
                svgCache.set(molecule.src, text)
                if (!active) return

                const elapsed = Date.now() - startTime
                const remaining = Math.max(0, minLoadingDuration - elapsed)
                setTimeout(() => {
                    if (!active) return
                    setSvgText(text)
                }, remaining)
            })
            .catch(() => {
                if (!active) return
            })

        // cancel fetch if component unmounts or molecule changes before fetch returns
        return () => {
            active = false
        }
    }, [molecule.src])

    const handleNextMolecule = () => {
        setMoleculeIndex((prev) => (prev + 1) % MAINTENANCE_SVGS.length)
    }

    return (
        <Layout>
            <div className="container my-auto py-5">
                <div className="row align-items-center gy-4 pb-lg-5">
                    <div className="col-12 col-lg-6">
                        <p className="font-monospace text-uppercase text-primary mb-4">
                            {status} {statusText}
                        </p>
                        <h1 className="display-3 mb-4">
                            System maintenance in progress
                        </h1>
                        <p className="lh-lg">
                            NERDD is temporarily offline while we update the
                            system and optimize the infrastructure. Please check
                            back in a few moments.
                        </p>
                        {!svgText ? (
                            <div className="placeholder-glow text-body-secondary lh-lg mb-4 d-none d-lg-block">
                                <div className="row gx-2">
                                    <div className="col-2"><span className="placeholder w-100"></span></div>
                                    <div className="col-3"><span className="placeholder w-100"></span></div>
                                    <div className="col-3"><span className="placeholder w-100"></span></div>
                                    <div className="col-4"><span className="placeholder w-100"></span></div>
                                </div>
                                <div className="row gx-2">
                                    <div className="col-3"><span className="placeholder w-100"></span></div>
                                    <div className="col-4"><span className="placeholder w-100"></span></div>
                                    <div className="col-3"><span className="placeholder w-100"></span></div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-body-secondary lh-lg mb-4 d-none d-lg-block">
                                Living organisms need maintenance too. The
                                molecule on the right is{" "}
                                <strong className="text-nowrap">
                                    {molecule.title}
                                </strong>
                                , which {molecule.description}.
                            </p>
                        )}
                        <button
                            type="button"
                            className="btn btn-primary text-nowrap d-inline-flex align-items-center me-3"
                            onClick={() => window.location.reload()}
                        >
                            <FaRotateRight
                                size={15}
                                className="me-3"
                                aria-hidden="true"
                            />
                            Reload page
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary text-nowrap d-inline-flex align-items-center"
                            onClick={handleNextMolecule}
                        >
                            <FaArrowRight
                                size={15}
                                className="me-3"
                                aria-hidden="true"
                            />
                            Next molecule
                        </button>
                    </div>

                    <div
                        className="col-lg-6 d-lg-block d-none"
                        aria-hidden="true"
                    >
                        <div className="mx-auto">
                            <MoleculeIllustration svgText={svgText} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
