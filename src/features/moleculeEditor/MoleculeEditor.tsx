import { useCallback, useEffect, useId, useState } from "react"
import useJsApplet from "./useJsApplet"

type MoleculeEditorProps = {
    value?: string
    onChange?: (value: string) => void
    width?: string
    height?: string
    config?: Record<string, any>
}

export default function MoleculeEditor({
    value,
    onChange,
    width = "100%",
    height = "340px",
    config = {},
}: MoleculeEditorProps) {
    const JSApplet = useJsApplet()
    const [appletInstance, setAppletInstance] = useState(null)

    // generate id
    const containerId = useId()

    const jsmeContainerRef = useCallback(
        (node: HTMLElement | null) => {
            if (JSApplet == null || containerId == null || node == null) {
                return
            }

            // create a JSME instance
            if (appletInstance === null) {
                const newAppletInstance = new JSApplet.JSME(
                    containerId,
                    width,
                    height,
                    config,
                )

                // propagate changes in the structure
                newAppletInstance.setAfterStructureModifiedCallback(() => {
                    onChange?.(newAppletInstance.smiles())
                })

                setAppletInstance(newAppletInstance)
            }
        },
        [
            JSApplet,
            containerId,
            appletInstance,
            width,
            height,
            config,
            onChange,
        ],
    )

    useEffect(() => {
        if (appletInstance) {
            // JSME can't handle SMILES with labels, so we need to remove them
            const cleanValue = value != null ? value.split(" ")[0] : value

            // Avoid rerendering the drawn molecule. If the same smiles value is passed
            // this way, the exact coordinates are preserved.
            if (appletInstance.smiles() !== cleanValue) {
                appletInstance.readGenericMolecularInput(cleanValue)
            }
        }
    }, [appletInstance, value])

    // JSME does not measure the width of the container correctly leading to a tall editor. For
    // this reason, we need to repaint the editor after it is rendered.
    if (appletInstance) {
        setTimeout(() => {
            appletInstance.repaint()
        }, 0)
    }

    return <div id={containerId} ref={jsmeContainerRef}></div>
}
