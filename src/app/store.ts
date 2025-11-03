import fileFieldSliceReducer from "@/features/fileUpload/fileFieldSlice"
import resultTableSliceReducer from "@/features/resultTable/resultTableSlice"
import { baseApi } from "@/services"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

// conditionally import debugSliceReducer based on environment (this saves 75% of bundle size)
const debugSliceReducer =
    import.meta.env.MODE === "development"
        ? (await import("@/features/debug/debugSlice")).default
        : (state = null) => state

const tweakPanelSliceReducer =
    import.meta.env.MODE === "development"
        ? (await import("@/features/tweakPanel/tweakPanelSlice")).default
        : (state = null) => state

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        debug: debugSliceReducer,
        tweakPanel: tweakPanelSliceReducer,
        fileField: fileFieldSliceReducer,
        resultTable: resultTableSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
