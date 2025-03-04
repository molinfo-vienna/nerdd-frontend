import { useScript } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"

let instance = null
const subscribers = new Set()
let refCount = 0

export default function useJsApplet() {
    // we change the following state if we would like to force a "rerender" of this hook
    // (-> all components using this hook get the new JSApplet instance)
    const [, forceRender] = useState({})

    useEffect(() => {
        // update ref count
        refCount += 1

        // add this component to subscribers
        const subscription = () => forceRender({})
        subscribers.add(subscription)

        // JSME is loaded asynchronously, so we need to wait for it to be loaded.
        window.jsmeOnLoad = () => {
            instance = window.JSApplet

            // notify all components using this singleton
            subscribers.forEach((notify) => notify())
        }

        // clean up
        return () => {
            subscribers.delete(subscription)

            refCount -= 1

            if (refCount === 0) {
                instance = null
                window.jsmeOnLoad = null
            }
        }
    }, [])

    // JSME has a broken installation process, so we need to load it manually.
    useScript("/resources/legacyjs/jsme_2017-02-26/jsme/jsme.nocache.js", {
        removeOnUnmount: false,
    })

    return instance
}
