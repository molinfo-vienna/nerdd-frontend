import { useScript } from "@uidotdev/usehooks"
import { useState } from "react"

export default function useJsApplet() {
    // JSApplet is a global variable that is set by the JSME script. If it already exists, we set
    // it to the state immediately. Otherwise, it will be null and the following code will set it.
    const [JSApplet, setJSApplet] = useState(window.JSApplet)

    // JSME is loaded asynchronously, so we need to wait for it to be loaded.
    // Note: we could use useEffect here, but it is fine that the global function jsmeOnLoad is
    // overwritten every time this script is called.
    window.jsmeOnLoad = () => {
        setJSApplet(window.JSApplet)
    }

    // JSME has a broken installation process, so we need to load it manually.
    useScript("/resources/legacyjs/jsme_2017-02-26/jsme/jsme.nocache.js", {
        removeOnUnmount: false,
    })

    return JSApplet
}
