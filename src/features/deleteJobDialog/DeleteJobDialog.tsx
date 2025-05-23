import { useDeleteJobMutation } from "@/services"
import { useNavigate } from "react-router-dom"

type DeleteJobDialogProps = {
    id: string
    moduleId: string
    jobId: string
}

export default function DeleteJobDialog({
    id,
    moduleId,
    jobId,
}: DeleteJobDialogProps) {
    const [deleteJob] = useDeleteJobMutation()
    const navigate = useNavigate()

    const handleAccept = () => {
        deleteJob({ moduleId, jobId }).then((response) => {
            navigate("/")
        })
    }

    return (
        <div
            className="modal fade"
            tabIndex={-1}
            id={id}
            aria-labelledby="deleteJobModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteJobModalLabel">
                            Delete Job
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this job?
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        {/* The attribute data-bs-dismiss="modal" should not
                         * be used here. However, if we omit it, the backdrop
                         * (dark background) is still visible after closing the
                         * modal. */}
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleAccept}
                            data-bs-dismiss="modal"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
