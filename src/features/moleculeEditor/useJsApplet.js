import { useEffect, useRef, useState } from "react"

export default function useJsApplet() {
    const calledOnce = useRef(false)
    const [JSApplet, setJSApplet] = useState(null)

    useEffect(() => {
        if (calledOnce.current) {
            return
        }

        window.jsmeOnLoad = () => {
            setJSApplet(window.JSApplet)
        }

        const script = document.createElement("script")
        script.src = "/legacyjs/jsme_2017-02-26/jsme/jsme.nocache.js"
        script.async = true
        document.body.appendChild(script)

        calledOnce.current = true

        // never remove this script like below!
        // return () => {
        //     document.body.removeChild(script)
        //     setJSApplet(null)
        // }
    }, [])

    // load jsme script via useScript hook doesn't work...
    // const status = useScript("/legacyjs/jsme_2017-02-26/jsme/jsme.nocache.js", {
    //     removeOnUnmount: false,
    // })

    return JSApplet
}
