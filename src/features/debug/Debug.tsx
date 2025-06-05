import { useAppDispatch, useAppSelector } from "@/app/hooks"
import MockServer from "@/features/mockServer/MockServer"
import TweakPanel from "@/features/tweakPanel/TweakPanel"
import { useDebounce, useLocalStorage } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"
import { makeButton, useTweaks } from "use-tweaks"
import { setNumModules } from "./debugSlice"

type DebugProps = {
    children?: React.ReactNode
}

type DebugSettings = {
    mockServerEnabled: boolean
    return404: boolean
    logRequests: boolean
    numModules: number
    numResults: number
    pageSize: number
    predictionSpeed: number
}

export default function Debug({ children }: DebugProps) {
    const dispatch = useAppDispatch()
    const moduleConfigs = useAppSelector((state) => state.debug.moduleConfigs)
    const jobs = useAppSelector((state) => state.debug.jobs)

    const [settings, setSettings] = useLocalStorage<DebugSettings>("debug", {
        // whether the mock server should be used (instead of the real API)
        mockServerEnabled: true,
        // whether to return 404 for all requests
        return404: false,
        // whether to log requests
        logRequests: false,

        // number of modules to generate
        numModules: 8,
        // number of results to generate per job
        numResults: 10000,
        // number of results per page
        pageSize: 10,
        // number of results generated per second
        predictionSpeed: 1,
    })

    const {
        mockServerEnabled,
        return404,
        logRequests,
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
        logRequests: {
            value: false,
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
            // TODO: refresh
        }),
    })

    // don't re-render immediately when receiving an update from the tweak panel
    // TODO: fix types
    const debouncedTweaks = useDebounce(tweaks, 500) as unknown as DebugSettings

    useEffect(() => {
        setSettings({
            mockServerEnabled: debouncedTweaks.mockServerEnabled,
            return404: debouncedTweaks.return404,
            logRequests: debouncedTweaks.logRequests,
            numModules: debouncedTweaks.numModules,
            numResults: debouncedTweaks.numResults,
            pageSize: debouncedTweaks.pageSize,
            predictionSpeed: debouncedTweaks.predictionSpeed,
        })
    }, [debouncedTweaks, setSettings])

    // render children after a short delay to ensure that the mock server is initialized
    const [renderChildren, setRenderChildren] = useState(false)
    useEffect(() => {
        setTimeout(() => setRenderChildren(true), 50)
    }, [setRenderChildren])

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
                logRequests={logRequests}
            />
            {renderChildren && children}
        </>
    )
}
