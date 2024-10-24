import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const fileFieldSlice = createSlice({
    name: "fileField",
    initialState,
    reducers: {
        createFileField(state, action) {
            state[action.payload] = []
        },
        deleteFileField(state, action) {
            delete state[action.payload]
        },
        addPendingFile(state, action) {
            state[action.payload.fileFieldName].push({
                filename: action.payload.filename,
                id: action.payload.id,
                status: "pending",
                sourceId: null,
            })
        },
        setStatus(state, action) {
            const fileField = state[action.payload.fileFieldName]
            const file = fileField.find((file) => file.id === action.payload.id)
            file.status = action.payload.status
        },
        setSourceData(state, action) {
            const fileField = state[action.payload.fileFieldName]
            const file = fileField.find((file) => file.id === action.payload.id)
            file.sourceData = action.payload.sourceData
        },
        setRequest(state, action) {
            const fileField = state[action.payload.fileFieldName]
            const file = fileField.find((file) => file.id === action.payload.id)
            file.request = action.payload.request
        },
        deleteFile(state, action) {
            const fileField = state[action.payload.fileFieldName]
            const index = fileField.findIndex(
                (file) => file.id === action.payload.id,
            )
            fileField.splice(index, 1)
        },
    },
})

export const {
    createFileField,
    deleteFileField,
    addPendingFile,
    setStatus,
    deleteFile,
    setSourceData,
    setRequest,
} = fileFieldSlice.actions

export default fileFieldSlice.reducer
