import { FaTrash } from "react-icons/fa6"
import DeleteJobDialog from "../deleteJobDialog/DeleteJobDialog"
import ActionButton from "./ActionButton"

type DeleteActionButtonProps = {
    moduleId: string
    jobId: string
}

export default function DeleteActionButton({
    moduleId,
    jobId,
}: DeleteActionButtonProps) {
    return (
        <ActionButton label="Delete" style="danger" modalId="deleteJobModal">
            <ActionButton.Icon>
                <FaTrash size={32} />
            </ActionButton.Icon>
            <ActionButton.Modal>
                <DeleteJobDialog
                    id="deleteJobModal"
                    moduleId={moduleId}
                    jobId={jobId}
                />
            </ActionButton.Modal>
        </ActionButton>
    )
}
