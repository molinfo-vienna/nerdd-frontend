import { FaBookOpen } from "react-icons/fa6"
import ActionButton from "./ActionButton"

type DocsActionButtonProps = {
    moduleId: string
}

export default function DocsActionButton({ moduleId }: DocsActionButtonProps) {
    return (
        <ActionButton to={`/${moduleId}/about`} label="Docs">
            <ActionButton.Icon>
                <FaBookOpen viewBox="0 0 576 400" size={40} />
            </ActionButton.Icon>
        </ActionButton>
    )
}
