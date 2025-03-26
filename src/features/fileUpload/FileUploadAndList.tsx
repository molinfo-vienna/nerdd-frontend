import { useAppDispatch, useAppSelector } from "@/hooks"
import { useAddSourceMutation, useDeleteSourceMutation } from "@/services"
import classNames from "classnames"
import { useCallback, useEffect, useState, type RefObject } from "react"
import { FieldRenderProps } from "react-final-form"
import { v4 as uuidv4 } from "uuid"
import FileList from "./FileList"
import FileUpload from "./FileUpload"
import {
    addPendingFile,
    createFileField,
    deleteFile,
    deleteFileField,
    setErrorMessage,
    setSourceData,
    setStatus,
    type File,
} from "./fileFieldSlice"

type FileUploadAndListProps = FieldRenderProps<File[]> & {
    name: string
    tooltipPositionReference?: RefObject<HTMLElement>
}

export default function FileUploadAndList({
    input,
    meta,
    name,
    tooltipPositionReference,
}: FileUploadAndListProps) {
    const dispatch = useAppDispatch()

    // create file field in the store (and delete it when component is unmounted)
    useEffect(() => {
        dispatch(createFileField(name))

        return () => {
            dispatch(deleteFileField(name))
        }
    }, [name, dispatch])

    // get current value from the store
    const files = useAppSelector((state) => state.fileField[name])

    useEffect(() => {
        input.onChange(files)
    }, [files, input])

    const [addSource, {}] = useAddSourceMutation()

    const [requests, setRequests] = useState({})

    const onDrop = useCallback(
        (acceptedFiles) => {
            // upload all files to the server
            acceptedFiles.forEach((file) => {
                // generate unique id for the file (because filename isn't unique)
                const id = uuidv4()

                // add file as pending
                dispatch(
                    addPendingFile({
                        fileFieldName: name,
                        filename: file.name,
                        id,
                    }),
                )

                // upload file to the server
                const request = addSource({ file })

                // store request to be able to cancel it
                setRequests((requests) => ({
                    ...requests,
                    [id]: request,
                }))

                request.then((response) => {
                    // case 1: upload was aborted
                    if (response.error?.name === "AbortError") {
                        return
                    } else if (response.error) {
                        console.log(response.error)

                        // set status to error
                        dispatch(
                            setStatus({
                                fileFieldName: name,
                                id,
                                status: "error",
                            }),
                        )

                        // build error message
                        let errorMessage = "Unknown error"
                        if (response.error.status === 404) {
                            errorMessage = "Server not found. Try again later."
                        }

                        // set error message
                        dispatch(
                            setErrorMessage({
                                fileFieldName: name,
                                id,
                                errorMessage,
                            }),
                        )

                        return
                    }

                    // case 2: upload was successful
                    // set sourceId for the file
                    dispatch(
                        setSourceData({
                            fileFieldName: name,
                            id,
                            sourceData: response.data,
                        }),
                    )

                    // set status to success
                    dispatch(
                        setStatus({
                            fileFieldName: name,
                            id,
                            status: "success",
                        }),
                    )

                    // remove request object from the map
                    setRequests((requests) => {
                        const { [id]: _, ...newRequests } = requests
                        return newRequests
                    })
                })
            })
        },
        [name, addSource, dispatch],
    )

    const [deleteSource, {}] = useDeleteSourceMutation()

    const handleDelete = (file: File) => {
        dispatch(
            setStatus({
                fileFieldName: name,
                id: file.id,
                status: "deleting",
            }),
        )

        // check if request is still pending
        if (file.id in requests) {
            // -> abort request
            requests[file.id].abort()
            dispatch(deleteFile({ fileFieldName: name, id: file.id }))
        } else {
            // -> delete source on the server

            // get sourceId
            const sourceId = file.sourceData?.id

            deleteSource({ sourceId }).then((response) => {
                if (response.error?.name === "AbortError") {
                    return
                } else if (response.error) {
                    console.log(response.error)

                    // set status to error
                    dispatch(
                        setStatus({
                            fileFieldName: name,
                            id,
                            status: "error",
                        }),
                    )

                    // build error message
                    let errorMessage = "Unknown error"
                    if (response.error.status === 404) {
                        errorMessage = "Server not found. Try again later."
                    }

                    // set error message
                    dispatch(
                        setErrorMessage({
                            fileFieldName: name,
                            id,
                            errorMessage,
                        }),
                    )

                    return
                }

                dispatch(deleteFile({ fileFieldName: name, id: file.id }))
            })
        }
    }

    return (
        <div className="input-group has-validation">
            <div
                ref={tooltipPositionReference}
                className={classNames("w-100", {
                    "is-invalid": meta.touched && meta.error,
                })}
            >
                <FileUpload
                    name={name}
                    onDrop={onDrop}
                    className="form-control"
                />
            </div>
            {meta.touched && meta.error && (
                <div className="invalid-feedback">{meta.error}</div>
            )}
            {files !== undefined && files.length > 0 && (
                <FileList files={files} onClickDelete={handleDelete} />
            )}
        </div>
    )
}
