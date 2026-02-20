import fileFieldSliceReducer from "@/features/fileUpload/fileFieldSlice"
import resultTableSliceReducer from "@/features/resultTable/resultTableSlice"
import { baseApi } from "@/services"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    fileField: fileFieldSliceReducer,
    resultTable: resultTableSliceReducer,
}

function createAppStore() {
    return configureStore({
        reducer: reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(baseApi.middleware),
    })
}

async function createDevelopmentAppStore() {
    // debugSliceReducer and tweakPanelSlideReducer are imported lazily when this function is
    // called in development mode (this saves 75% of bundle size in production)
    const debugSliceReducer = (await import("@/features/debug/debugSlice"))
        .default

    const tweakPanelSliceReducer = (
        await import("@/features/tweakPanel/tweakPanelSlice")
    ).default

    return configureStore({
        reducer: {
            ...reducer,
            debug: debugSliceReducer,
            tweakPanel: tweakPanelSliceReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(baseApi.middleware),
    })
}

export const store =
    process.env.NODE_ENV === "development"
        ? await createDevelopmentAppStore()
        : createAppStore()

setupListeners(store.dispatch)

export type AppStore = ReturnType<typeof createAppStore>
export type DevelopmentAppStore = Awaited<
    ReturnType<typeof createDevelopmentAppStore>
>

export type RootState = ReturnType<AppStore["getState"]>
export type DevelopmentRootState = ReturnType<DevelopmentAppStore["getState"]>

export type AppDispatch = AppStore["dispatch"]
export type DevelopmentAppDispatch = DevelopmentAppStore["dispatch"]
