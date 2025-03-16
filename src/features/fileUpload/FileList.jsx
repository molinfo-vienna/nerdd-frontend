import PropTypes from "prop-types"
import React from "react"
import FileItem from "./FileItem"

export default function FileList({ files, onClickDelete }) {
    return (
        <ul className="px-3 py-2 list-unstyled w-100">
            {files !== undefined &&
                files.map((file) => (
                    <FileItem
                        key={file.id}
                        file={file}
                        onClickDelete={() => onClickDelete(file)}
                    />
                ))}
        </ul>
    )
}

FileList.propTypes = {
    files: PropTypes.array,
    onClickDelete: PropTypes.func,
}
