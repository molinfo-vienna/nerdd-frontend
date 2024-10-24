import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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
