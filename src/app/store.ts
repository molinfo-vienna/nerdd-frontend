import debugSliceReducer from "@/features/debug/debugSlice"
import fileFieldSliceReducer from "@/features/fileUpload/fileFieldSlice"
import tweakPanelSliceReducer from "@/features/tweakPanel/tweakPanelSlice"
import { baseApi } from "@/services"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        debug: debugSliceReducer,
        tweakPanel: tweakPanelSliceReducer,
        fileField: fileFieldSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
