import PropTypes from "prop-types"
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
            if (JSApplet == null || containerId == null || node == null) {
                return
            }

            // create a JSME instance
            if (appletInstance === null) {
                const newAppletInstance = new JSApplet.JSME(
                    containerId,
                    "100%",
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

    // JSME does not measure the width of the container correctly leading to a tall editor. For
    // this reason, we need to repaint the editor after it is rendered.
    if (appletInstance) {
        setTimeout(() => {
            appletInstance.repaint()
        }, 0)
    }

    return <div id={containerId} ref={jsmeContainerRef}></div>
}

MoleculeEditor.propTypes = {
    name: PropTypes.string.isRequired,
}
