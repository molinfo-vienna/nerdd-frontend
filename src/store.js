import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import debugSliceReducer from "./features/debug/debugSlice"
import fileFieldSliceReducer from "./features/fileUpload/fileFieldSlice"
import tweakPanelSliceReducer from "./features/tweakPanel/tweakPanelSlice"
import { nerddApi } from "./services"

export const store = configureStore({
    reducer: {
        [nerddApi.reducerPath]: nerddApi.reducer,
        debug: debugSliceReducer,
        tweakPanel: tweakPanelSliceReducer,
        fileField: fileFieldSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(nerddApi.middleware),
})

setupListeners(store.dispatch)
