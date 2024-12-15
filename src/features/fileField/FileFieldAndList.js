import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { useField } from "react-final-form"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { useAddSourceMutation, useDeleteSourceMutation } from "../../services"
import { refType } from "../../types"
import FileField from "./FileField"
import FileList from "./FileList"
import {
    addPendingFile,
    createFileField,
    deleteFile,
    deleteFileField,
    setSourceData,
    setStatus,
} from "./fileFieldSlice"

export default function FileFieldAndList({
    name,
    tooltipPositionReference,
    ...props
}) {
    const dispatch = useDispatch()

    // create file field in the store (and delete it when component is unmounted)
    useEffect(() => {
        dispatch(createFileField(name))

        return () => {
            dispatch(deleteFileField(name))
        }
    }, [name])

    // get current value from the store
    const files = useSelector((state) => state.fileField[name])

    // update react form field when value in the store changes
    const {
        input: { onChange: onChangeFiles },
        meta,
    } = useField(name)

    useEffect(() => {
        onChangeFiles(files)
    }, [files])

    const [addSource, {}] = useAddSourceMutation()

    const [requests, setRequests] = useState({})

    const onDrop = (acceptedFiles) => {
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
    }

    const [deleteSource, {}] = useDeleteSourceMutation()

    const handleDelete = (file) => {
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
            const sourceId = file.sourceData.id

            deleteSource({ sourceId }).then((response) => {
                // TODO: handle error
                dispatch(deleteFile({ fileFieldName: name, id: file.id }))
            })
        }
    }

    return (
        <div className="input-group has-validation">
            <div
                ref={tooltipPositionReference}
                className={`w-100 ${meta.touched && meta.error ? "is-invalid" : ""}`}
            >
                <FileField
                    name={name}
                    onDrop={onDrop}
                    {...props}
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

FileFieldAndList.propTypes = {
    name: PropTypes.string,
    tooltipPositionReference: refType,
}
