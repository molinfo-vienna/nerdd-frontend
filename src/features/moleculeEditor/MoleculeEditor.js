import PropTypes from "prop-types"
import React, { useCallback, useEffect, useId, useState } from "react"
import useJsApplet from "./useJsApplet"

export default function MoleculeEditor({
    value,
    onChange,
    width = "100%",
    height = "340px",
    config = {},
}) {
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
    value: PropTypes.string,
    onChange: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    config: PropTypes.object,
}
