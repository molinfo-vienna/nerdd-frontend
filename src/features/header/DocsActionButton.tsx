import { FaBookOpen } from "react-icons/fa6"
import ActionButton from "./ActionButton"

type DocsActionButtonProps = {
    moduleId: string
}

export default function DocsActionButton({ moduleId }: DocsActionButtonProps) {
    return (
        <ActionButton to={`/${moduleId}/about`} label="Docs">
            <ActionButton.Icon>
                <FaBookOpen size={35} />
            </ActionButton.Icon>
        </ActionButton>
    )
}
