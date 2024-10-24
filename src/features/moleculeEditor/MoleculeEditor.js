import React, { useCallback, useEffect, useId, useState } from "react"
import { useField } from "react-final-form"
import useJsApplet from "./useJsApplet"

export default function MoleculeEditor({ name }) {
    const {
        input: { value, onChange },
    } = useField(name, { initialValue: "" })

    const JSApplet = useJsApplet()
    const [appletInstance, setAppletInstance] = useState(null)

    // generate id
    const containerId = useId()

    const jsmeContainerRef = useCallback(
        (node) => {
            if (node === null || JSApplet === null) {
                return
            }

            // create a JSME instance
            if (appletInstance === null) {
                const newAppletInstance = new JSApplet.JSME(
                    containerId,
                    "746px",
                    "340px",
                )

                // propagate changes in the structure
                newAppletInstance.setAfterStructureModifiedCallback(() => {
                    onChange(newAppletInstance.smiles())
                })

                setAppletInstance(newAppletInstance)
            }
        },
        [JSApplet, containerId],
    )

    useEffect(() => {
        if (appletInstance) {
            // Avoid rerendering the drawn molecule. If the same smiles value is passed
            // this way, the exact coordinates are preserved.
            if (appletInstance.smiles() !== value) {
                appletInstance.readGenericMolecularInput(value)
            }
        }
    }, [appletInstance, value])

    return <div id={containerId} ref={jsmeContainerRef}></div>
}
