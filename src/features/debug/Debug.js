import { useDebounce, useLocalStorage } from "@uidotdev/usehooks"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { makeButton, useTweaks } from "use-tweaks"
import MockServer from "../mockServer/MockServer"
import TweakPanel from "../tweakPanel/TweakPanel"
import { incrementKey, setNumModules } from "./debugSlice"

const debugMode = process.env.NODE_ENV === "development"

export default function Debug() {
    const dispatch = useDispatch()
    const moduleConfigs = useSelector((state) => state.debug.moduleConfigs)
    const jobs = useSelector((state) => state.debug.jobs)

    const [settings, setSettings] = useLocalStorage("debug", {
        // whether the mock server should be used (instead of the real API)
        mockServerEnabled: true,
        // whether to return 404 for all requests
        return404: false,

        // number of modules to generate
        numModules: 8,
        // number of results to generate per job
        numResults: 10000,
        // number of results per page
        pageSize: 10,
        // number of results generated per second
        predictionSpeed: 10,
    })

    const {
        mockServerEnabled,
        return404,
        numModules,
        numResults,
        pageSize,
        predictionSpeed,
    } = settings

    useEffect(() => {
        dispatch(setNumModules(numModules))
    }, [dispatch, numModules])

    //
    // Tweak panel
    //
    const tweaks = useTweaks("MockServer", {
        mockServerEnabled: {
            value: mockServerEnabled,
        },
        return404: {
            value: return404,
        },
        numModules: {
            value: numModules,
            min: 1,
            max: 100,
            step: 1,
        },
        numResults: {
            value: numResults,
            min: 1,
            max: 1000000,
            step: 1,
        },
        pageSize: {
            value: pageSize,
            min: 1,
            max: 1000,
            step: 1,
        },
        predictionSpeed: {
            value: predictionSpeed,
            min: 0,
            max: 50000,
            step: 1,
        },
        ...makeButton("Clear local storage", () => {
            localStorage.clear()
            dispatch(incrementKey())
        }),
    })

    // don't re-render immediately when receiving an update from the tweak panel
    const debouncedTweaks = useDebounce(tweaks, 500)

    useEffect(() => {
        setSettings({
            mockServerEnabled: debouncedTweaks.mockServerEnabled,
            return404: debouncedTweaks.return404,
            numModules: debouncedTweaks.numModules,
            numResults: debouncedTweaks.numResults,
            pageSize: debouncedTweaks.pageSize,
            predictionSpeed: debouncedTweaks.predictionSpeed,
        })
    }, [debouncedTweaks])

    //
    // render nothing if debug mode is disabled
    //
    if (!debugMode) {
        return null
    }

    return (
        <>
            <TweakPanel />
            <MockServer
                enabled={mockServerEnabled}
                return404={return404}
                pageSize={pageSize}
                numResults={numResults}
                predictionSpeed={predictionSpeed}
                moduleConfigs={moduleConfigs}
                jobs={jobs}
            />
        </>
    )
}
