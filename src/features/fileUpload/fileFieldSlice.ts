import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface File {
    filename: string
    id: string
    status: "pending" | "success" | "error" | "deleting"
    errorMessage?: string
    sourceId?: string
    sourceData?: string
}

const initialState: Record<string, File[]> = {}

const fileFieldSlice = createSlice({
    name: "fileField",
    initialState,
    reducers: {
        createFileField(state, action: PayloadAction<string>) {
            state[action.payload] = []
        },
        deleteFileField(state, action: PayloadAction<string>) {
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
        setErrorMessage(state, action) {
            const fileField = state[action.payload.fileFieldName]
            const file = fileField.find((file) => file.id === action.payload.id)
            if (file !== undefined) {
                file.errorMessage = action.payload.errorMessage
            }
        },
        setSourceData(state, action) {
            const fileField = state[action.payload.fileFieldName]
            const file = fileField.find((file) => file.id === action.payload.id)
            if (file !== undefined) {
                file.sourceData = action.payload.sourceData
            }
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
    setErrorMessage,
    deleteFile,
    setSourceData,
    setRequest,
} = fileFieldSlice.actions

export default fileFieldSlice.reducer
