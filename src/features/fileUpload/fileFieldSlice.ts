import { Source } from "@/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface File {
    filename: string
    id: string
    status: "pending" | "success" | "error" | "deleting"
    progress: number
    errorMessage?: string
    sourceId?: string
    sourceData?: Source
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
                progress: 0,
                sourceId: undefined,
            })
        },
        setStatus(state, action) {
            const fileField = state[action.payload.fileFieldName]
            const file = fileField.find((file) => file.id === action.payload.id)
            if (file !== undefined) {
                file.status = action.payload.status
            }
        },
        setProgress(state, action) {
            const fileField = state[action.payload.fileFieldName]
            const file = fileField.find((file) => file.id === action.payload.id)
            if (file !== undefined) {
                file.progress = action.payload.progress
            }
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
    setProgress,
    setErrorMessage,
    deleteFile,
    setSourceData,
} = fileFieldSlice.actions

export default fileFieldSlice.reducer
