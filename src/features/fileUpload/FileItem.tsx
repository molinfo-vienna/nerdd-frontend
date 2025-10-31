import classNames from "classnames"
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6"
import { File } from "./fileFieldSlice"

type FileItemProps = {
    file: File
    onClickDelete: (file: File) => void
}

export default function FileItem({ file, onClickDelete }: FileItemProps) {
    return (
        <li key={file.id}>
            <div className="d-flex my-1">
                {/* pending */}
                {file.status === "pending" ? (
                    <div
                        className="spinner-border spinner-border-sm text-primary"
                        role="status"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : null}
                {/* deleting */}
                {file.status === "deleting" ? (
                    <div
                        className="spinner-border spinner-border-sm text-danger"
                        role="status"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : null}
                {/* success */}
                {file.status === "success" ? (
                    <span className="text-success">
                        <FaRegCircleCheck />
                    </span>
                ) : null}
                {/* error */}
                {file.status === "error" ? (
                    <span className="text-danger">
                        <FaRegCircleXmark />
                    </span>
                ) : null}
                <div
                    className={classNames("text-truncate flex-fill ps-2 pe-5", {
                        "text-danger": file.status === "error",
                    })}
                >
                    {file.filename}
                    {file.errorMessage ? (
                        <span className="text-danger">
                            {" "}
                            - {file.errorMessage}
                        </span>
                    ) : null}
                </div>
                {file.status === "pending" ? (
                    <span className="small text-muted pe-2">
                        {file.progress}%
                    </span>
                ) : null}
                {/* delete */}
                {file.status !== "deleting" ? (
                    <button
                        className="btn-close"
                        onClick={() => {
                            onClickDelete(file)
                        }}
                        type="button"
                    >
                        <span className="visually-hidden">Delete</span>
                    </button>
                ) : null}
            </div>
        </li>
    )
}
