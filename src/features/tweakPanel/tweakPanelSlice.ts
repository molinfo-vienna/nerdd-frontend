import { createSlice } from "@reduxjs/toolkit"

export interface TweakPanelState {
    collapse: boolean
}

const initialState: TweakPanelState = {
    // show / hide the tweaks widget in the top left corner
    collapse: false,
}

const tweakPanelSlice = createSlice({
    name: "tweakPanel",
    initialState,
    reducers: {
        setCollapse: (state, action) => {
            return { ...state, collapse: action.payload }
        },
    },
})

export const { setCollapse } = tweakPanelSlice.actions

export default tweakPanelSlice.reducer
